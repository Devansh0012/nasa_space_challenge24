# /sdg_game_backend/game/views.py

from django.shortcuts import render
from django.contrib.auth import login, authenticate, logout
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, LoginSerializer
from django.db import transaction
from .models import Profile, Progress
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

# Register API view
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Create Progress for the new user
            Progress.objects.create(user=user)
            return Response({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'message': 'User registered successfully.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login API view
class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]  # Allow anyone to access the login endpoint
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            # Try to authenticate the user with email and password
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Log in the user and create a session
                login(request, user)
                
                # Return successful response with user info
                return Response({
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                    'message': 'Logged in successfully.',
                    'success': True,  # Add this to check for success on frontend
                }, status=status.HTTP_200_OK)
            else:
                # Invalid credentials
                return Response({'error': 'Invalid credentials', 'success': False}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Invalid data from the serializer
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Logout API view
class LogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)


# View for retrieving and updating user progress
@login_required
def progress(request):
    progress = Progress.objects.get(user=request.user)
    if request.method == "GET":
        return JsonResponse({
            "level_completed": progress.level_completed,
            "score": progress.score,
            "badges_earned": progress.badges_earned,
        })
    elif request.method == "POST":
        progress.level_completed = request.POST.get("level_completed", progress.level_completed)
        progress.score = request.POST.get("score", progress.score)
        progress.badges_earned = request.POST.get("badges_earned", progress.badges_earned)
        progress.save()
        return JsonResponse({"message": "Progress updated successfully."}, status=status.HTTP_200_OK)