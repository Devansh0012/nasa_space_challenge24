# /sdg_game_backend/game/views.py

from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status, serializers, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import Progress
from django.contrib.auth.decorators import login_required
import json

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match")
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError("Username already exists")
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("Email already exists")
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )
        return user


# Register API view
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'username': serializer.validated_data['username'],
                'email': serializer.validated_data['email'],
                'message': 'User registered successfully.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Login API view
@csrf_exempt
@api_view(['POST'])
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            # Find user by email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Invalid email or user not found'}, status=401)

        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Login successful'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid password'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON format'}, status=400)

    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

@login_required
def get_progress(request):
    user = request.user
    progress = Progress.objects.get(user=user)
    return JsonResponse({
        'level_completed': progress.level_completed,
        'score': progress.score,
        'badges_earned': progress.badges_earned,
        'last_updated': progress.last_updated,
    })

@csrf_exempt
@login_required
def update_progress(request):
    if request.method == 'POST':
        user = request.user
        data = json.loads(request.body)
        progress, created = Progress.objects.get_or_create(user=user)
        progress.level_completed = data.get('level_completed', progress.level_completed)
        progress.score = data.get('score', progress.score)
        progress.badges_earned = data.get('badges_earned', progress.badges_earned)
        progress.save()
        return JsonResponse({'message': 'Progress updated successfully'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)