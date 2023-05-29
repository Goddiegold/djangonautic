from django.shortcuts import get_object_or_404

from rest_framework import serializers

from djoser.serializers import UserCreateSerializer, UserSerializer

from .models import Article,CustomUser


class ArticleSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = self.context.get('request').user if self.context.get('request') else {}
        return super().create({**validated_data,'author':user})

    class Meta:
        model = Article
        fields = ['id','title','body','slug','image']




class GetArticleSerializer(serializers.ModelSerializer):

    author_name = serializers.SerializerMethodField(method_name='author_method')

    def author_method(self,data:Article):
        author =  get_object_or_404(CustomUser, pk=data.author.id)
        return author.username

    
    class Meta:
        model = Article
        fields = ['id','title','body','slug','image','author_name']




class AppUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id','username','password', 'email']




class AppCurrentUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields =['id','username','email']