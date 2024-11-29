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
    path("view_note/<int:noteID>", views.view_note, name="view_note"),
    path("delete_note/<int:noteID>", views.delete_note, name="delete_note"),
    path("list/<int:page>", views.list_notes, name="list_with_page"),
    path("list", views.list_notes, name="list"),
    path("search", views.search, name="search"),
    path("edit/<int:noteID>", views.edit_note, name="edit"),
    path("homepage", views.homepage, name="homepage"),
    path("bookmark/<int:number>", views.bookmarks, name="bookmark"),
    path("bookmark", views.bookmarks, name="bookmark_view")
]