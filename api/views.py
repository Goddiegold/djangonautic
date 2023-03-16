from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpRequest

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Article
from .serializers import ArticleSerializer


# Create your views here.

@api_view(['GET', 'POST'])
def articles_list(request:HttpRequest):
    if request.method == 'GET':
        queryset = Article.objects.all()
        serializer = ArticleSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def article_details(request, id):
     
     article =  get_object_or_404(Article, pk=id)

     if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
     
     if request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
     
     if request.method == 'DELETE': 
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
