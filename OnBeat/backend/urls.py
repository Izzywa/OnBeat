from django.urls import path 
from . import views

app_name = 'backend'

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("login", views.login_view, name="login"),
    path("current-user", views.getCurrentUser, name="current-user"),
    path("create_note", views.create_note, name="create_note"),
    path("view_note/<str:title>", views.view_note, name="view_note")
]