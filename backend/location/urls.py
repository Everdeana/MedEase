from django.urls import path
from .views import generate_map

urlpatterns = [
    path('map/', generate_map, name='generate_map'),
]
