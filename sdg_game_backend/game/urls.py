from django.urls import path, include
from . import views
from .views import *
from rest_framework.routers import DefaultRouter
# from .views import SDGGroupViewSet, StudentProgressViewSet, QuizViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/',LoginView.as_view(),name='login'),
    path('api/register/',RegisterView.as_view(),name='register'),
    path('api/progress/', views.progress, name='progress'),
    # path('api/progress/update/', views.update_progress, name='update_progress'),
]