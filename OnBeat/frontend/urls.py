from django.urls import path 
from . import views

app_name = 'frontend'

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.index, name="login"),
    path("register", views.index, name="register"),
    path("create-note", views.index, name="create-_ote"),
    path("note/<int:noteID>", views.index, name="view_note"),
    path("list", views.index, name="list")
]
