from django.urls import path
from .views import reddit_views

urlpatterns = [
    path('', reddit_views.as_view())
]
