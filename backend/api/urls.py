from django.urls import path, register_converter
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('api/', views.get_routes), 
    path('user/', views.UserProfileListView.as_view(), name='login_success'),
    # path('login/', views.LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]

