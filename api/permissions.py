
from rest_framework.permissions import BasePermission
from django.http import HttpRequest
from django.shortcuts import get_object_or_404

from .models import Article


class IsAuthor(BasePermission):
    def has_permission(self, request:HttpRequest, view):
        print("I was called for",request.method)
        article_id = ''.join(filter(str.isdigit,request.path))
        # print('article_id-->', article_id)
        article =  get_object_or_404(Article, pk=int(article_id))
        # print('article-->', article)
        # print('request.method-->', request.method)
        status = bool (request.method=="PUT" and article.author.email == request.user.email)
        print("status-->",status)
        return status
          