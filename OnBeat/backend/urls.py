from django.urls import path 
from . import views

app_name = 'backend'

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("logout", views.logout, name="logout"),
    path("login", views.login, name="login")
]