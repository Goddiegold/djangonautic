from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

## using the DRF router for viewsets
router.register("articles",views.ArticleViewSet,"article")


urlpatterns = router.urls

# urlpatterns = [
#     path('articles/',views.ArticleViewSet.as_view(),name='articles_list'),
#     #path('articles/<int:pk>/',views.ArticleDetails.as_view(),name='article_details'),
# ]
