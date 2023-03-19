from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpRequest

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin,CreateModelMixin
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Article
from .serializers import ArticleSerializer


# Create your views here.

# function based view
# @api_view(['GET', 'POST'])
# def articles_list(request:HttpRequest):
#     if request.method == 'GET':
#         queryset = Article.objects.all()
#         serializer = ArticleSerializer(
#             queryset, many=True, context={'request': request})
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = ArticleSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         # print(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# class based before
# class ArticlesList(APIView):
#     def get(self,request:HttpRequest):
#           queryset = Article.objects.all()
#           serializer = ArticleSerializer(
#             queryset, many=True, context={'request': request})
#           return Response(serializer.data)
    
#     def post(self,request:HttpRequest):
#           serializer = ArticleSerializer(data=request.data)
#           serializer.is_valid(raise_exception=True)
#           serializer.save()
#             # print(serializer.data)
#           return Response(serializer.data, status=status.HTTP_201_CREATED)

        

# function based view
# @api_view(['GET', 'PUT', 'DELETE'])
# def article_details(request, id):
     
#      article =  get_object_or_404(Article, pk=id)

#      if request.method == 'GET':
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data)
     
#      if request.method == 'PUT':
#         serializer = ArticleSerializer(article, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
     
#      if request.method == 'DELETE': 
#         article.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


#class based view
# class ArticleDetails(APIView):
     
#      def get(self,request:HttpRequest,id):
#         article =  get_object_or_404(Article, pk=id)
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data)
     
#      def put(self,request:HttpRequest,id):
#           article =  get_object_or_404(Article, pk=id)
#           serializer = ArticleSerializer(article, data=request.data)
#           serializer.is_valid(raise_exception=True)
#           serializer.save()
#           return Response(serializer.data)
     
#      def delete(self,request:HttpRequest,id):
#           article =  get_object_or_404(Article, pk=id)
#           article.delete()
#           return Response(status=status.HTTP_204_NO_CONTENT)
          



#generics view 
# (ListCreateAPIView inherits from  ListModelMixin,CreateModelMixin)
# ListCreateAPIView - get all articles and add new articles
# class ArticlesList(ListCreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     def get_serializer_context(self):
#         return {'request':self.request}
                    

# ListCreateAPIView - get all articles and add new articles
# class ArticleDetails(RetrieveUpdateAPIView,RetrieveUpdateDestroyAPIView):
#       queryset = Article.objects.all()
#       serializer_class = ArticleSerializer

#       def get_serializer_context(self):
#         return {'request':self.request}



##########viewsets#######
class ArticleViewSet(ModelViewSet):
     queryset = Article.objects.all()
     serializer_class = ArticleSerializer

     def get_serializer_context(self):
        return {'request':self.request}