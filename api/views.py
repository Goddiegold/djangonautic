from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from api.permissions import isAuthorOrAdmin
from .models import Article, CustomUser
from .serializers import ArticleSerializer, GetArticleSerializer


########## viewsets#######
class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.select_related('author')
# or self.action == "destroy"

    def get_permissions(self):
        print(self.action)
        if self.action == 'create' or self.action == "partial_update" or self.action == "update" or self.action == "destroy":
            return [IsAuthenticated()]
        return super().get_permissions()

    def update(self, request: HttpRequest, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance: Article = self.get_object()
        if isAuthorOrAdmin(request, instance):
            serializer = self.get_serializer(
                instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response({'message': 'Not Authorized'}, status=status.HTTP_401_UNAUTHORIZED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if isAuthorOrAdmin(request, instance):
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'Not Authorized'}, status=status.HTTP_401_UNAUTHORIZED)

    def get_serializer_context(self):
        return {'request': self.request}

    def get_serializer_class(self):
        if self.request.method == "POST" or self.request.method == 'PUT':
            return ArticleSerializer
        return GetArticleSerializer
