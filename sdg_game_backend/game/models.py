from django.db import models
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms

# RegisterForm for user registration
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User  # Use Django's built-in User model
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

# LoginForm for user login
class LoginForm(AuthenticationForm):
    username = forms.EmailField(label="Email")

class Progress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link progress to a specific user
    level_completed = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    badges_earned = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Progress"