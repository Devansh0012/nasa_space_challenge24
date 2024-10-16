from django.db import models
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms

# Profile model to store additional user information
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school_name = models.CharField(max_length=255)

    def _str_(self):
        return f"{self.user.first_name} {self.user.last_name}'s Profile"

# RegisterForm for user registration (without username, using email instead)
class RegisterForm(UserCreationForm):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    school_name = forms.CharField(required=True)
    email = forms.EmailField(required=True)

    class Meta:
        model = User  # Use Django's built-in User model
        fields = ['first_name', 'last_name', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email = self.cleaned_data['email']
        if commit:
            user.save()

            # Save the profile with school name after saving the user
            Profile.objects.create(user=user, school_name=self.cleaned_data['school_name'])
        
        return user

# LoginForm for user login
class LoginForm(AuthenticationForm):
    username = forms.EmailField(label="Email")  # Use email as the login field

# Progress model to track user progress
class Progress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    level_completed = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    badges_earned = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def _str_(self):
        return f"{self.user.first_name} {self.user.last_name}'s Progress"