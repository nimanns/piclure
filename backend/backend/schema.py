import graphene
from graphene_django import DjangoObjectType
from pics.models import Post, Image as Imager, UserJTI, Comment
from django.contrib.auth import authenticate, get_user, get_user_model, login, logout
# from django.contrib.auth.models import User
import graphql_jwt
from graphene_file_upload.scalars import Upload
from graphql import GraphQLError
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
from graphene_django_pagination import DjangoPaginationConnectionField
from backend.utils import generate_jti
from graphql_jwt.decorators import permission_required
from django.core import serializers


class ImageType(DjangoObjectType):
    class Meta:
        model = Imager
        fields = "__all__"


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment
        fields = "__all__"


class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = ["id", "title", "description",
                  "uploader", "date_time", "likes"]
        filter_fields = []

    related_images = graphene.List(ImageType)
    comments = graphene.List(CommentType)

    def resolve_related_images(self, info, **kwargs):
        return self.images.all().order_by('order')

    def resolve_comments(self, info, **kwargs):
        return self.comments_of.all().order_by('-date_time')


class UploaderType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ["username", "first_name", "last_name", "post_set", "id"]

    groups = graphene.String()

    @classmethod
    def resolve_groups(cls, root, info, **kwargs):
        if not info.context.user.groups.values().exists():
            return "None"
        else:
            return info.context.user.groups.values()[0]['name']


class Query(graphene.ObjectType):
    get_posts = DjangoPaginationConnectionField(PostType)
    get_post_by_id = graphene.Field(PostType, id=graphene.String())
    users = graphene.List(UploaderType)
    get_user = graphene.Field(UploaderType)
    user_exists = graphene.Boolean(username=graphene.String())
    user_liked = graphene.Boolean(id=graphene.ID())

    @classmethod
    def resolve_user_exists(self, root, info, username):
        if get_user_model().objects.filter(username=username.lower()):
            return True
        else:
            return False

    @classmethod
    def resolve_get_posts(self, root, info, **kwargs):
        return Post.objects.all().order_by("-date_time")

    @classmethod
    def resolve_get_post_by_id(self, root, info, id):
        return Post.objects.get(pk=id)

    def resolve_users(self, info):
        if (info.context.user.is_superuser):
            return get_user_model().objects.all()
        raise GraphQLError("Not Allowed!")

    def resolve_get_user(self, info):
        if (info.context.user.is_authenticated):
            return info.context.user
        raise GraphQLError("User not signed in")
        # return None

    def resolve_user_liked(self, info, id):
        if not (info.context.user.is_authenticated):
            raise GraphQLError("User not logged in")

        user = info.context.user
        post = Post.objects.get(id=id)

        if post.liked_users.filter(id=user.id):
            return True
        else:
            return False


class PostMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        file = Upload(required=False)

    post = graphene.Field(PostType)

    @classmethod
    @permission_required("pics.post.can_add_post")
    def mutate(cls, root, info, title, description, file=None):
        if not info.context.user.is_authenticated:
            raise GraphQLError("User not logged in")

        if len(file) > 9:
            raise GraphQLError("Can not upload more than 9 pictures")

        if not file:
            post = Post(title=title, description=description)
            post.uploader = info.context.user
            post.save()
            return PostMutation(post=post)

        post = Post(title=title, description=description)
        post.uploader = info.context.user
        post.save()
        counter = 0
        if file:
            for f in file:
                image = Imager(related_post=post)
                image.name = f.name[:5]
                image.order = counter
                counter += 1
                image.save()
                image_obj = Image.open(f)
                # image_obj = resizeimage.resize_width(image_obj, 800, validate=False)
                new_image_io = BytesIO()
                image_obj.save(new_image_io, image_obj.format)
                temp_name = f.name[:5] + "." + image_obj.format
                image.image.save(temp_name,
                                 content=ContentFile(
                                     new_image_io.getvalue()))
        return PostMutation(post=post)


class LogoutUser(graphene.Mutation):
    id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        user = info.context.user
        current_jti = UserJTI.objects.get(user=user)
        logout(info.context)
        current_jti.jti = generate_jti()
        # user.userjti.jti = generate_jti()
        current_jti.save()
        return cls(id=user.id)


class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        firstname = graphene.String(required=True)
        lastname = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(UploaderType)

    @classmethod
    def mutate(cls, root, info, username, password, firstname, lastname,
               email):

        if (info.context.user.is_authenticated):
            raise GraphQLError("You can't sign up you are already logged in!")
        if not firstname:
            raise GraphQLError("Name is required!")
        if not len(username) > 3:
            raise GraphQLError("Username is too short!")
        if not username.isalnum():
            raise GraphQLError("Only alphanumerics are allowed in usernames")
        if not len(password) > 5:
            raise GraphQLError("Password is too short!")
        if get_user_model().objects.filter(username=username):
            raise GraphQLError("Username already exists! Try another one")

        user = get_user_model().objects.create_user(username=username.lower(),
                                                    password=password)
        user.first_name = firstname
        user.last_name = lastname
        user.email = email.lower()
        user.save()
        UserJTI.objects.create(user=user)
        return cls(user=user)


class DeleteImage(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
        image_order = graphene.Int(required=True)

    post = graphene.Field(PostType)

    @classmethod
    def mutate(cls, root, info, post_id, image_order):
        try:
            result = Post.objects.get(id=post_id).images.get(
                order=image_order).delete()
            print(result)
            post = Post.objects.get(id=post_id)
            counter = 0
            print(post.images.all())
            for image in post.images.all().order_by('order'):
                image.order = counter
                image.save()
                counter += 1
            return cls(post=post)
        except Exception as exp:
            return GraphQLError(exp)


class LikePost(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
        liked = graphene.Boolean(required=True)

    post = graphene.Field(PostType)

    @classmethod
    def mutate(cls, root, info, post_id, liked):
        if not info.context.user.is_authenticated:
            raise GraphQLError("You have to be signed in to like a post")

        user = info.context.user
        post = Post.objects.get(id=post_id)

        if post.liked_users.filter(id=user.id) and liked:
            post.liked_users.remove(user)
            post.likes = post.liked_users.count()
            post.save()
            return LikePost(post=post)
        if not post.liked_users.filter(id=user.id) and not liked:
            post.liked_users.add(user)
            post.likes = post.liked_users.count()
            post.save()

        return LikePost(post=post)


class CreateComment(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
        content = graphene.String(required=True)

    comment = graphene.Field(CommentType)

    @classmethod
    def mutate(cls, root, info, post_id, content):
        if not info.context.user.is_authenticated:
            raise GraphQLError("You have to be signed in to comment")

        user = info.context.user
        post = Post.objects.get(id=post_id)

        comment = Comment.objects.create(publisher=user, comment=content)
        post.comments_of.add(comment)
        comment.save()
        return CreateComment(comment=comment)

class DeleteJWTCookie(graphene.Mutation):
    class Arguments:
        pass
    
    ok = graphene.Boolean()

    @classmethod
    def mutate(cls,root,info):
        context = info.context
        context.jwt_token = ""
        return DeleteJWTCookie(ok=True)

class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    logout_user = LogoutUser.Field()
    upload_image = PostMutation.Field()
    create_user = CreateUser.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    # Long running refresh tokens
    delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()
    delete_image = DeleteImage.Field()
    like_post = LikePost.Field()
    create_comment = CreateComment.Field()
    delete_jwt_cookie = DeleteJWTCookie().Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
