from django.contrib import admin
from .models import Article,CustomUser

# Register your models here.

admin.site.register(Article)
admin.site.register(CustomUser)