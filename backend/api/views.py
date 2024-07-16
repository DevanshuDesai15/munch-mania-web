from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import random

# Create your views here.
food_suggestions = {
    'italian': ['Pizza', 'Pasta', 'Risotto', 'Lasagna'],
    'mexican': ['Tacos', 'Burrito', 'Enchiladas', 'Quesadilla'],
    'japanese': ['Sushi', 'Ramen', 'Tempura', 'Udon'],
    'indian': ['Curry', 'Biryani', 'Tandoori Chicken', 'Panner Butter Masala'],
}

@require_http_methods(["GET"])
def get_food_suggestions(request):
    cuisine = request.GET.get('cuisine', '').lower()

    if cuisine and cuisine in food_suggestions:
        suggestions = random.choice(food_suggestions[cuisine])
    else:
        all_foods = [food for foods in food_suggestions.values() for food in foods]
        suggestions = random.choice(all_foods)
    
    return JsonResponse({'suggestions': suggestions})