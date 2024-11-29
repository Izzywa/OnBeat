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
        
def create_item_and_noteList(item, note, index):
    if item['type'] == 'note':
        try:
            obj = NoteContent(note=note, heading=item['content']['heading'], text=item['content']['text'])
            obj.save()
        except:
            return {
                    'heading': 'Error in saving note content.',
                    'text': 'Note content invalid.',
                    'buttons': None
                }
            
        try:
            notelist_obj = NoteList(type=NoteList.NOTE, index=index, note=note, content=obj)
            notelist_obj.save()
        except:
            return {
                    'heading': 'Error in saving note.',
                    'text': 'Note content in notelist invalid.',
                    'buttons': None
                }
    else:
        try:
            obj = NoteTimestamp(note=note, timestamp=timedelta(seconds=item['content']['timestamp']), text=item['content']['text'])
            obj.save()
        except:
            print(item)
            return {
                'heading': 'Error in saving timestamp.',
                'text': 'Timestamp invalid.',
                'buttons': None
            }
            
        try:
            notelist_obj = NoteList(type=NoteList.TIMESTAMP, index=index, note=note, timestamp=obj)
            notelist_obj.save()
        except:
            return {
                'heading': 'Error in saving note.',
                'text': 'Note timestamp in notelist invalid.',
                'buttons': None
            }
                
    return None
        
def save_noteList_item(noteList, note):
    for index, value in enumerate(noteList):
        create_item = create_item_and_noteList(item=value, note=note, index=index)
        if create_item is not None:
            return create_item
    return None

def edit_item(item, id):
    if item['type'] == 'note':
        try:
            obj = NoteContent.objects.get(id=id)
        except NoteContent.DoesNotExist:
            return {
                'heading': 'Error in editing note.',
                'text': 'Note content does not exist',
                'buttons': None
            }
        obj.heading = item['content']['heading']
        obj.text = item['content']['text']
    else:
        try:
            obj = NoteTimestamp.objects.get(id=id)
        except NoteTimestamp.DoesNotExist:
            return {
                'heading': 'Error in editing timestamp.',
                'text': 'Note timestamp does not exist',
                'buttons': None
            }
        obj.timestamp = timedelta(seconds=item['content']['timestamp'])
        obj.text = item['content']['text']
    
    try:
        obj.save()
    except:
        return {
            'heading': 'Error in editing note.',
            'text': 'Note content or timestamp in invalid.',
            'buttons': None
        }
    return None

def delete_notelist_item(item):
    if item.type == 'note':
        item.content.delete()
    else:
        item.timestamp.delete()