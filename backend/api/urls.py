from django.urls import path
from .views import get_food_suggestions

urlpatterns = [
    path('suggestion', get_food_suggestions, name='get_food_suggestions'),
]