from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
     email = models.EmailField(unique=True)

    #  USERNAME_FIELD = "email"
    #  REQUIRED_FIELDS = []


class Profile(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE)



class Article(models.Model):
    title =  models.CharField(max_length=50)
    slug = models.SlugField()
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, null=True, upload_to='articles/images')
    author = models.ForeignKey(Profile,on_delete=models.CASCADE)


    def __str__(self):
        return self.title
    


    