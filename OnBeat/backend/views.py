import json
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from rest_framework import status

from .models import User
from .helpers import validateUsername, validatePassword, validateEmail, getJWToken

# Create your views here.
def index(request):
    return HttpResponse("BACKEND VIEW")

def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({
                'username': user.username
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                'error': True,
                'message': 'Invalid username and/or password'
            }, status=status.HTTP_409_CONFLICT)

@login_required(login_url='/login')
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("frontend:login"))

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        error_status = {
            'username': '',
            'email': '',
            'password': '',
            'confirmation': {
                'error': False,
                'message': ''
            }
        }
        
        username =data.get("username")
        email = data.get("email")
        password = data.get("password")
        confirmation = data.get("confirmation")
        
        error_status['username'] = validateUsername(username)
        error_status['email'] = validateEmail(email)
        error_status['password'] = validatePassword(password)
        if password != confirmation:
            error_status['confirmation'] = {
                'error': True,
                'message': 'Reenter password.'
            }
        if True in [value['error'] for key, value in error_status.items()]:
            return JsonResponse(error_status, status=status.HTTP_409_CONFLICT)
        else:
            user = User.objects.create_user(username, email,password)
            user.save()
            login(request, user)
            return JsonResponse({'username': user.username}, status=status.HTTP_200_OK)
        
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)