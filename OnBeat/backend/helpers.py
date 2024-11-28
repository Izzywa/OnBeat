import os
import re
from datetime import timedelta
from requests import post
from dotenv import load_dotenv
load_dotenv()

from .models import NoteContent, NoteTimestamp, NoteList, User

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
        
def save_noteList_item(noteList, note):
    for index, value in enumerate(noteList):
        if value['type'] == 'note':
             # 1) create the appropriate modal object from each item on the list
            try:
                item = NoteContent(note=note, heading=value['content']['heading'], text=value['content']['text'])
                item.save()
            except:
                return {
                    'heading': 'Error in saving note content.',
                    'text': 'Note content invalid.',
                    'buttons': None
                }
            
              # 2) create noteList Object with the index it was given to make sure it is in the right order
            try:
                notelist_obj = NoteList(type=NoteList.NOTE, index=index, note=note, content=item)
                notelist_obj.save()
            except:
                return {
                    'heading': 'Error in saving note.',
                    'text': 'Note content in notelist invalid.',
                    'buttons': None
                }
                
        else:
            try:
                item = NoteTimestamp(note=note, timestamp=timedelta(seconds=value['content']['timestamp']), text=value['content']['text'])
                item.save()
            except:
                return {
                    'heading': 'Error in saving timestamp.',
                    'text': 'Timestamp invalid.',
                    'buttons': None
                }
            try:    
                notelist_obj = NoteList(type=NoteList.TIMESTAMP, index=index, note=note, timestamp=item)
                notelist_obj.save()
            except:
                return {
                    'heading': 'Error in saving note.',
                    'text': 'Note timestamp in notelist invalid.',
                    'buttons': None
                }
    return None