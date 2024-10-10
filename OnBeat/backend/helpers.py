import os
import re
from .models import User
from requests import post
from dotenv import load_dotenv
load_dotenv()

def validateUsername(username):
    if not username:
        return {
            'error': True,
            'message': 'Field must not be empty.'
        }
    else:
        try:
            user = User.objects.get(username=username)
            return {
                'error': True,
                'message': f'Username {username} already taken.'
            }
        except User.DoesNotExist:
            return {
                'error': False,
                'message': 'Valid username.'
            }

def validatePassword(password):
    if not password:
        return {
            'error': True,
            'message': 'Field must not be empty.'
        }
    elif len(password) < 6:
        return {
            'error': True,
            'message': 'Password must be at least 6 characters.'
        }
    else:
        return {
            'error': False,
            'message': 'Valid password'
        }
        
def validateEmail(email):
    if not email:
        return {
            'error': True,
            'message': 'Field must not be empty.'
        }
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

    if(re.fullmatch(regex, email)):
        return {
            'error': False,
            'message': 'Valid email'
        }

    else:
        return {
            'error': True,
            'message': 'Email not valid.'
        }