from rest_framework import serializers
from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    # image = serializers.ImageField(
    #     max_length=None, 
    #     allow_empty_file=False,
    #     allow_null=True,
    #     required=False
    # )

    class Meta:
        model = Article
        fields = ['id','title','body','slug','image']



class AppUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id','username','password', 'email']


class AppCurrentUserSerializer(UserSerializer):
    
    class Meta(UserSerializer.Meta):
        fields =['id','username','email']