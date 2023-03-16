from rest_framework import serializers
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