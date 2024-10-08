from django.urls import path 
from . import views

app_name = 'frontend'

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.index, name="login"),
    path("register", views.index, name="register")
]
