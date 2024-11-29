import os
import re
from datetime import timedelta
from requests import post
from dotenv import load_dotenv
load_dotenv()

from .models import NoteContent, NoteTimestamp, NoteList, User

class Error_message:
    def __init__(self):
        self.TITLE_NOT_UNIQUE = {
            'heading': 'Note title already exists.',
            'text': 'Please choose a unique title.',
            'buttons': None
        }
        self.TITLE_ERROR = {
            'heading': 'Error with note title',
            'text': 'Title must be 1-200 characters and unique from other notes title.',
            'buttons': None
        }
        self.URL_ERROR = {
            'heading': 'Error with Youtube URL',
            'text': 'Please make sure the youtube URL is valid.',
            'buttons': None
        }
        self.NOTE_NOT_FOUND = {
            'heading': 'ERROR',
            'text': 'Note not found.',
            'buttons': None
        }
        self.CONTENT_NOT_FOUND = {
            'heading': 'ERROR',
            'text': 'Note content not found.',
            'buttons': None
        }
        self.TIMESTAMP_NOT_FOUND = {
            'heading': 'ERROR',
            'text': 'Note timestamp not found.',
            'buttons': None
        }
        self.CONTENT_NOT_VALID = {
            'heading': 'Error in saving note content.',
            'text': 'Note content invalid.',
            'buttons': None
        }
        self.TIMESTAMP_NOT_VALID = {
            'heading': 'Error in saving note timestamp.',
            'text': 'Note timestamp invalid.',
            'buttons': None
        }
        self.NOTELIST_NOT_VALID = {
            'heading': "Error in saving noteList",
            'text': "invalid notelist object",
            'buttons': None
        }
        
MESSAGE = Error_message()

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
        obj = NoteContent(note=note, heading=item['content']['heading'], text=item['content']['text'])
        try:
            obj.full_clean()
            obj.save()
        except:
            return MESSAGE.CONTENT_NOT_VALID
            
        notelist_obj = NoteList(type=NoteList.NOTE, index=index, note=note, content=obj)
        try:
            notelist_obj.full_clean()
            notelist_obj.save()
        except:
            return MESSAGE.NOTELIST_NOT_VALID
    else:
        obj = NoteTimestamp(note=note, timestamp=timedelta(seconds=item['content']['timestamp']), text=item['content']['text'])
        try:
            obj.full_clean()
            obj.save()
        except:
            print(item)
            return MESSAGE.TIMESTAMP_NOT_VALID
            
        notelist_obj = NoteList(type=NoteList.TIMESTAMP, index=index, note=note, timestamp=obj)
        try:
            notelist_obj.full_clean()
            notelist_obj.save()
        except:
            return MESSAGE.NOTELIST_NOT_VALID
                
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
            return MESSAGE.CONTENT_NOT_FOUND
        
        obj.heading = item['content']['heading']
        obj.text = item['content']['text']
    else:
        try:
            obj = NoteTimestamp.objects.get(id=id)
        except NoteTimestamp.DoesNotExist:
            return MESSAGE.TIMESTAMP_NOT_FOUND
        
        obj.timestamp = timedelta(seconds=item['content']['timestamp'])
        obj.text = item['content']['text']
    
    try:
        obj.full_clean()
        obj.save()
    except:
        return MESSAGE.NOTELIST_NOT_VALID
    return None

def delete_notelist_item(item):
    if item.type == 'note':
        item.content.delete()
    else:
        item.timestamp.delete()