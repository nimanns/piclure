from django.contrib import admin
from django.contrib.auth.models import User
from pics.models import Post,Image,UserJTI
from django.contrib import admin

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  fields=["title","description","uploader","likes","liked_users"]
  list_display=["title","description","uploader","likes","date_time","images__image"]

  def images__image(self,obj):
    return obj

admin.site.register(Image)
admin.site.register(UserJTI)

