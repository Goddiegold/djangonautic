from django.shortcuts import get_object_or_404

from rest_framework import serializers, response,status

from djoser.serializers import UserCreateSerializer, UserSerializer

from .models import Article,CustomUser


class ArticleSerializer(serializers.ModelSerializer):
    # image = serializers.ImageField(
    #     max_length=None, 
    #     allow_empty_file=False,
    #     allow_null=True,
    #     required=False
    # )

    def create(self, validated_data):
        user = self.context.get('request').user if self.context.get('request') else ""
        return super().create({**validated_data,'author':user})
    
    # def update(self, instance, validated_data):
    #     print("instance-->", instance)
    #     user = self.context.get('request').user if self.context.get('request') else ""
    #     if instance.author == user:
    #         return super().update(instance, validated_data)
    #     return response.Response({'message':'Not allowed to edit!'},status=status.HTTP_403_FORBIDDEN)

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
    print("I WAS CALLED - 1")

    # def update(self, instance, validated_data):
    #     return super().update(instance, validated_data)

    class Meta(UserCreateSerializer.Meta):
        fields = ['id','username','password', 'email']




class AppCurrentUserSerializer(UserSerializer):
    print("I WAS CALLED - 2")
    
    class Meta(UserSerializer.Meta):
        fields =['id','username','email']