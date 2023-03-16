from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class CustomUser(User):
    pass


class Article(models.Model):
    title =  models.CharField(max_length=50)
    slug = models.SlugField()
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True, upload_to='articles/images')
    #author = models.ForeignKey(CustomUser,default=None,on_delete=models.CASCADE)


    def __str__(self):
        return self.title
    


    