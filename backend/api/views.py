from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .models import UserProfile
from django.db import transaction
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
import uuid
from rest_framework.views import APIView
from .serializers import UserProfileSerializer

def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) 
    serializer_class = RegisterSerializer
    
    def perform_create(self, serializer):
        with transaction.atomic():
            user = serializer.save()
            UserProfile.objects.create(
                user_id=user.username,
                sub = uuid.uuid4()
                )
    

@api_view(['GET'])
def get_routes(request):
    routes = [
        {'name': 'Token Obtain', 'method': 'POST', 'path': '/api/token/'},
        {'name': 'Register User', 'method': 'POST', 'path': '/api/register/'},
        {'name': 'Token Refresh', 'method': 'POST', 'path': '/api/token/refresh/'},
        {'name': 'Test Endpoint', 'method': 'GET, POST', 'path': '/api/test/'},
        {'name': 'User Profile Detail', 'method': 'GET', 'path': '/api/user/<uuid:sub>/'},
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny]) 
def test_endpoint(request):
    print("test_endpoint")
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
    elif request.method == 'POST':
        text = request.data.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
    else:
        return Response({"error": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'response': data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def register_info(request):
    return Response({"message": "This is the register endpoint. Use POST to create a new user."})


class UserProfileListView(APIView):
    def get(self, request):
        try:
            user_profiles = UserProfile.objects.all()
            serializer = UserProfileSerializer(user_profiles, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


from rest_framework.response import Response
from django.contrib.auth import authenticate, login
# from .serializers import LoginSerializer

# class LoginView(generics.GenericAPIView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = LoginSerializer

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)

#             if user.UserProfile.sub:
#                 uuid = user.UserProfile.sub
#             else:
#                 uuid = uuid.uuid4()
#                 user.UserProfile.sub = uuid
#                 user.UserProfile.save()

#             return Response({'uuid': str(uuid), 'token': user.auth_token.key})  # 토큰과 UUID 함께 반환
#         else:
#             return Response({'error': 'Invalid credentials'}, status=401)