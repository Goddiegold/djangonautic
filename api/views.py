from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Article
from .serializers import ArticleSerializer, GetArticleSerializer


########## viewsets#######
class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.prefetch_related("author").all()

    def update(self, request:HttpRequest, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance:Article = self.get_object()
        if instance.author.email != request.user.email:
            return Response({'message':'Not Authorized'},status=status.HTTP_401_UNAUTHORIZED)
        else:
             serializer = self.get_serializer(instance,data=request.data, partial=partial)
             serializer.is_valid(raise_exception=True)
             self.perform_update(serializer)
             return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated()]
        return super().get_permissions()

    def get_serializer_context(self):
        return {'request': self.request}

    def get_serializer_class(self):
        if self.request.method == "POST" or self.request.method == 'PUT':
            return ArticleSerializer
        return GetArticleSerializer
