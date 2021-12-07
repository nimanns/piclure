import binascii
import os
from django.contrib.auth import authenticate, login
from graphql_jwt.utils import get_user_by_payload
from graphql_jwt.utils import jwt_decode as graphql_jwt_decode
from graphql_jwt.utils import jwt_payload as graphql_jwt_payload
from jwt import MissingRequiredClaimError, InvalidTokenError

# from .settings import jwt_settings
from functools import wraps

class InvalidJwtIdError(InvalidTokenError):
    pass


def generate_jti():
    return binascii.hexlify(os.urandom(32)).decode()


def jwt_payload(user, context=None):
    payload = graphql_jwt_payload(user, context)
    # login(user=user,request=context)
    # authenticate(user=user.username,password=user.password)
    payload["jti"] = user.userjti.jti
    return payload


def jwt_decode(token, context=None):
    payload = graphql_jwt_decode(token, context)
    user = get_user_by_payload(payload)
    _validate_jti(payload, user)
    return payload


def _validate_jti(payload, user):
    print(user)
    if not user.is_authenticated:
        return
    if user.userjti.jti is None:
        return
    if "jti" not in payload:
        raise MissingRequiredClaimError("jti")
    if payload["jti"] != user.userjti.jti:
        print(payload)
        print(payload.keys())
        print(user)
        raise InvalidJwtIdError("Invalid JWT id")
        
def delete_cookie(response, key):
    response.delete_cookie(
        key,
        # path=jwt_settings.JWT_COOKIE_PATH,
        # domain=jwt_settings.JWT_COOKIE_DOMAIN,
        samesite="None",
        # secure="True",
    )

def jwt_proper_delete(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        request.jwt_cookie = True
        response = view_func(request, *args, **kwargs)

        if hasattr(request, "delete_jwt_cookie"):
            delete_cookie(response, "JWT")

        return response

    return wrapped_view