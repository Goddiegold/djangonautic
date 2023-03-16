from django.urls import path
from . import views


urlpatterns = [
    path('articles/',views.articles_list,name='articles_list'),
    path('articles/<int:id>/',views.article_details,name='article_details'),
]
