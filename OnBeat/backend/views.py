import json
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status

from .models import User

# Create your views here.
def index(request):
    return HttpResponse("BACKEND VIEW")

def login(request):
    pass

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        username =data.get("username")
        email = data.get("email")
        password = data.get("password")
        confirmation = data.get("confirmation")
        # test password and confirmation
        if password != confirmation:
            return JsonResponse({'error': 'Password does not match confirmation password.'}, status=status.HTTP_409_CONFLICT)
        
        # test if username taken
        try:
            user = User.objects.create_user(username,email,password)
            user.save()
        except IntegrityError:
            return JsonResponse({'error': 'Username already taken'}, status=status.HTTP_409_CONFLICT)
        
        
        pass
    else:
        return JsonResponse({'error': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)