from django.urls import path,include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

## using the DRF router for viewsets
router.register("articles",views.ArticleViewSet,"article")

urlpatterns = [
       path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]


urlpatterns += router.urls
# print(urlpatterns)

# urlpatterns = [
#     path('articles/',views.ArticleViewSet.as_view(),name='articles_list'),
#     #path('articles/<int:pk>/',views.ArticleDetails.as_view(),name='article_details'),
# ]
