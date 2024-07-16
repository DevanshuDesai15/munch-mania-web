from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import random

# Create your views here.
food_suggestions = {
    'italian': [
        {
            'name': 'Spaghetti Carbonara',
            'description': 'A classic Roman pasta dish with eggs, cheese, and pancetta.',
            'prepTime': '20 mins',
            'difficulty': 'Easy',
            'rating': 4.7,
            'ingredients': ['Spaghetti', 'Eggs', 'Pecorino Romano', 'Pancetta', 'Black Pepper']
        },
        {
            'name': 'Margherita Pizza',
            'description': 'A simple yet delicious pizza with tomatoes, mozzarella, and basil.',
            'prepTime': '30 mins',
            'difficulty': 'Medium',
            'rating': 4.5,
            'ingredients': ['Pizza Dough', 'Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil']
        },
        {
            'name': 'Risotto alla Milanese',
            'description': 'Creamy saffron-infused rice dish from Milan.',
            'prepTime': '40 mins',
            'difficulty': 'Medium',
            'rating': 4.6,
            'ingredients': ['Arborio Rice', 'Saffron', 'Onion', 'White Wine', 'Parmesan Cheese']
        },
        {
            'name': 'Osso Buco',
            'description': 'Braised veal shanks in a rich, flavorful sauce.',
            'prepTime': '3 hours',
            'difficulty': 'Hard',
            'rating': 4.8,
            'ingredients': ['Veal Shanks', 'White Wine', 'Tomatoes', 'Onion', 'Gremolata']
        }
    ],
    'mexican': [
        {
            'name': 'Tacos al Pastor',
            'description': 'Marinated pork tacos with pineapple, onions, and cilantro.',
            'prepTime': '40 mins',
            'difficulty': 'Medium',
            'rating': 4.8,
            'ingredients': ['Pork', 'Pineapple', 'Corn Tortillas', 'Onions', 'Cilantro']
        },
        {
            'name': 'Guacamole',
            'description': 'A creamy avocado dip perfect for any Mexican feast.',
            'prepTime': '15 mins',
            'difficulty': 'Easy',
            'rating': 4.6,
            'ingredients': ['Avocados', 'Lime', 'Onion', 'Tomatoes', 'Cilantro']
        },
        {
            'name': 'Enchiladas Verdes',
            'description': 'Corn tortillas filled with chicken and covered in green salsa.',
            'prepTime': '45 mins',
            'difficulty': 'Medium',
            'rating': 4.7,
            'ingredients': ['Corn Tortillas', 'Chicken', 'Tomatillos', 'Sour Cream', 'Cheese']
        },
        {
            'name': 'Chiles en Nogada',
            'description': 'Stuffed poblano chiles with walnut sauce and pomegranate seeds.',
            'prepTime': '2 hours',
            'difficulty': 'Hard',
            'rating': 4.9,
            'ingredients': ['Poblano Chiles', 'Ground Meat', 'Fruits', 'Walnuts', 'Pomegranate']
        }
    ],
    'indian': [
        {
            'name': 'Butter Chicken',
            'description': 'Tender chicken in a rich, creamy tomato-based sauce.',
            'prepTime': '50 mins',
            'difficulty': 'Medium',
            'rating': 4.8,
            'ingredients': ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Garam Masala']
        },
        {
            'name': 'Vegetable Biryani',
            'description': 'Fragrant rice dish with mixed vegetables and aromatic spices.',
            'prepTime': '1 hour',
            'difficulty': 'Medium',
            'rating': 4.6,
            'ingredients': ['Basmati Rice', 'Mixed Vegetables', 'Yogurt', 'Saffron', 'Biryani Masala']
        },
        {
            'name': 'Palak Paneer',
            'description': 'Spinach curry with cubes of fresh cheese.',
            'prepTime': '40 mins',
            'difficulty': 'Easy',
            'rating': 4.5,
            'ingredients': ['Spinach', 'Paneer', 'Onion', 'Tomatoes', 'Garam Masala']
        },
        {
            'name': 'Tandoori Chicken',
            'description': 'Yogurt and spice marinated chicken cooked in a tandoor oven.',
            'prepTime': '4 hours',
            'difficulty': 'Medium',
            'rating': 4.7,
            'ingredients': ['Chicken', 'Yogurt', 'Lemon Juice', 'Tandoori Masala', 'Ginger-Garlic Paste']
        }
    ],
    'japanese': [
        {
            'name': 'Sushi Rolls',
            'description': 'Vinegared rice rolls with various fillings wrapped in nori.',
            'prepTime': '1 hour',
            'difficulty': 'Hard',
            'rating': 4.7,
            'ingredients': ['Sushi Rice', 'Nori', 'Fish', 'Vegetables', 'Soy Sauce']
        },
        {
            'name': 'Miso Soup',
            'description': 'Traditional Japanese soup with fermented soybean paste.',
            'prepTime': '15 mins',
            'difficulty': 'Easy',
            'rating': 4.5,
            'ingredients': ['Dashi', 'Miso Paste', 'Tofu', 'Wakame Seaweed', 'Green Onions']
        },
        {
            'name': 'Teriyaki Chicken',
            'description': 'Grilled chicken glazed with sweet soy sauce.',
            'prepTime': '30 mins',
            'difficulty': 'Easy',
            'rating': 4.6,
            'ingredients': ['Chicken', 'Soy Sauce', 'Mirin', 'Sugar', 'Sake']
        },
        {
            'name': 'Ramen',
            'description': 'Noodle soup with various toppings and flavorful broth.',
            'prepTime': '3 hours',
            'difficulty': 'Hard',
            'rating': 4.8,
            'ingredients': ['Ramen Noodles', 'Pork Belly', 'Soft-boiled Egg', 'Nori', 'Bamboo Shoots']
        }
    ]
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