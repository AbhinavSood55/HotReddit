from django.urls import path
from .views import index
import re

urlpatterns = [
    path('', index),
    # path('.*/', index),
]
