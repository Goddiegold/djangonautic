from django.urls import path
from . import views


urlpatterns = [
    path('articles/',views.ArticlesList.as_view(),name='articles_list'),
    path('articles/<int:pk>/',views.ArticleDetails.as_view(),name='article_details'),
]
