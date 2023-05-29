from django.http import HttpRequest
from .models import Article, CustomUser


def isAuthorOrAdmin(request: HttpRequest, instance: Article):
    """
This function checks if the current user owns the article or if the current user is an admin
"""
    return bool((isinstance(request.user, CustomUser) and instance.author.email == request.user.email) or request.user.is_superuser)
