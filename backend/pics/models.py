from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
from backend.utils import generate_jti

class Post(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=2500)
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL,
                                 on_delete=models.CASCADE,
                                 null=True)
    date_time = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveBigIntegerField(default=0,null=False)
    liked_users = models.ManyToManyField(User,related_name="liked_users")
    def __str__(self) -> str:
        return self.title


class Image(models.Model):
    name = models.CharField(max_length=250)
    image = models.FileField()
    order = models.IntegerField()
    related_post = models.ForeignKey("Post",
                                     null=True,
                                     on_delete=models.SET_NULL,
                                     related_name="images")
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Comment(models.Model):
    publisher = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=False)
    comment = models.CharField(max_length=350)
    date_time = models.DateTimeField(auto_now_add=True)
    post = models.ManyToManyField(Post,related_name="comments_of")


class UserJTI(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    jti = models.CharField(
        _("jwt id"),
        max_length=64,
        blank=False,
        null=False,
        default=generate_jti,
        help_text=_(
            "JWT tokens for the user get revoked when JWT id gets regenerated."
        ),
    )

    def __str__(self) -> str:
        return self.user.username