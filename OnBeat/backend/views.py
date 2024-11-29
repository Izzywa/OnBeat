import json
from django.db.models import Q
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from rest_framework import status
from datetime import timedelta

from .models import User, Note, NoteList, NoteContent, NoteTimestamp, YoutubeUrl
from .helpers import validateUsername, validatePassword, validateEmail, save_noteList_item, edit_item

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
    else:
        return HttpResponseRedirect(reverse("frontend:login"))

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
        return HttpResponseRedirect(reverse("frontend:register"))
    
def getCurrentUser(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            return JsonResponse({'message': 'user authenticated'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'message': 'NOT AUTHENTICATED'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return HttpResponseRedirect(reverse("frontend:index"))
    
@login_required(login_url='/login')
def create_note(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get("title")
        youtubeUrl = data.get("youtubeUrl")
        noteList = data.get("noteList")
        user = request.user
        
        titleMatch = Note.objects.filter(user=user, title__iexact=title)
        if len(titleMatch) > 0:
            return JsonResponse({
                    'heading': 'Note title already exists.',
                    'text': 'Please choose a unique title.',
                    'buttons': None
                }, status=409)
        else:
            
            try:
                note_title = Note(user=user, title=title)
                note_title.save()
            except:
                return JsonResponse({
                    'heading': 'Error with note title',
                    'text': 'Title must be 1-200 characters and unique from other notes title.',
                    'buttons': None
                }, status=409)
                
                
            if youtubeUrl is not None:
                try:
                    note_url = YoutubeUrl(note=note_title, url=youtubeUrl)
                    note_url.save()
                except:
                    note_title.delete()
                    return JsonResponse({
                    'heading': 'Error with Youtube URL',
                    'text': 'Please make sure the youtube URL is valid.',
                    'buttons': None
                }, status=409)
            else:
                # if no youtube url, should not have timestamps. convert the timestamps into normal notes
                for index, note in enumerate(noteList):
                    if note['type'] == 'timestamp':
                        newnote = {
                            'id': note['id'],
                            'type': 'note',
                            'content': {
                                'heading': '',
                                'text': note['content']['text']

                            }
                        }
                        noteList[index] = newnote

            error_message = save_noteList_item(noteList, note_title)
            if error_message is not None:
                note_title.delete()
                return JsonResponse(error_message, status=409)
            else:
                return JsonResponse({'id': note_title.id}, status=status.HTTP_200_OK)

    else:
        return HttpResponseRedirect(reverse("frontend:index"))
    
@login_required(login_url='/login')
def view_note(request, noteID):
    note = Note.objects.filter(user=request.user, id=noteID)
    if len(note) == 0:
        return JsonResponse({'message': f'Not found note'}, status=status.HTTP_404_NOT_FOUND)
    else:
        note = note[0]
        
        try:
            youtubeURL = note.youtubeURL.serialize()
        except:
            youtubeURL = None
            
        noteList = NoteList.objects.filter(note=note).order_by('index')
        if len(noteList) != 0:
            noteList = [item.serialize() for item in noteList]
        else: 
            noteList = []
            
        return JsonResponse({
            "note": note.serialize(),
            "youtubeURL": youtubeURL,
            "noteList": noteList
            }, status=status.HTTP_200_OK)
        
@login_required(login_url='/login')
def delete_note(request, noteID):
    if request.method == 'POST':
        note = Note.objects.filter(user=request.user, id=noteID)
        if len(note) != 1:
            return JsonResponse({'message': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        else: # delete note here
            note[0].delete()
            return JsonResponse({'message': 'SUCCESS'})
    else:
        return HttpResponseRedirect(reverse("frontend:view_note", args=(noteID,)))
    
@login_required(login_url="/login")
def list_notes(request, page=None):
    notes = Note.objects.filter(user=request.user).order_by('-date_created')
    
    if page is None:
        page = 1
        
    try:
        notes_pagination = Paginator(notes,5).page(page)
    except PageNotAnInteger:
        notes_pagination = Paginator(notes, 5).page(1)
    except EmptyPage:
        return JsonResponse({
            'message': 'page does not exist'
        }, status=404)
    
    list = [note.serialize() for note in notes_pagination]
    for index, note in enumerate(notes_pagination):
        try:
            youtubeURL = note.youtubeURL.url
        except:
            youtubeURL = None
        list[index]['youtubeURL'] = youtubeURL
            
    return JsonResponse({
        'notes': list,
        'num_pages': Paginator(notes,5).num_pages
        }, status=status.HTTP_200_OK)

@login_required(login_url="/login")
def search(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get("text")
        filter = data.get("filter")
        if data.get("page") is None:
            page = 1
        else:
            page= data.get("page")
        
        notes = []
        if filter['title']:
            title_list = Note.objects.filter(user=request.user, title__contains=text)
            if len(title_list) != 0:
                for title in title_list:
                    notes.append(title)
        
        if filter['note']:
            note_list = NoteContent.objects.filter(Q(note__user=request.user, text__contains=text) | Q(note__user=request.user, heading__contains=text))
            if len(note_list)!= 0:
                for note in note_list:
                    notes.append(note)
                    
        if filter['timestamp']:
            timestamp_list = NoteTimestamp.objects.filter(note__user=request.user, text__contains=text)
            if len(timestamp_list) != 0:
                for timestamp in timestamp_list:
                    notes.append(timestamp)
        
        notes_list = []
        num_pages = None
        if len(notes) != 0:       
            notes_list = sorted(notes, reverse=True, key=lambda obj: obj.date_created)
            try:
                notes_pagination = Paginator(notes_list,5).page(page)
            except PageNotAnInteger:
                notes_pagination = Paginator(notes_list, 5).page(1)
            except EmptyPage:
                return JsonResponse({
                    'error': True,
                    'message': 'Page not found'
                }, status=404)
            
            notes_list = [note.serialize() for note in notes_pagination]
            num_pages = Paginator(notes,5).num_pages
        
            return JsonResponse({
                'notes': notes_list,
                'num_pages': num_pages
                }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                'error': True,
                'message': 'No notes found.'
            }, status=404)
    else:
        return HttpResponseRedirect(reverse("frontend:search"))
    
@login_required(login_url="/login")
def edit_note(request, noteID):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get("title")
        youtubeUrl = data.get("youtubeUrl")
        noteList = data.get("noteList")
        user = request.user
        
        
        try:
            note = Note.objects.get(user=user, id=noteID)
        except Note.DoesNotExist:
            return JsonResponse({
                'heading': 'ERROR',
                'text': 'Note not found.',
                'buttons': None
            }, status=404)
            
        if note.title != title:
            if len(Note.objects.filter(user=user, title__iexact=title)) != 0:
                return JsonResponse({
                    'heading': 'Error with note title',
                    'text': 'Title must be 1-200 characters and unique from other notes title.',
                    'buttons': None
                }, status=409)
            
            try:
                note.title = title
                note.save()
            except:
                return JsonResponse({
                    'heading': 'Error with note title',
                    'text': 'Title must be 1-200 characters and unique from other notes title.',
                    'buttons': None
                }, status=409)
            
        url = YoutubeUrl.objects.filter(note=note)
        if len(url) == 0:
            if youtubeUrl is not None:
                try:
                    url = YoutubeUrl(note=note, url=youtubeUrl)
                    url.save()
                except:
                    return JsonResponse({
                        'heading': 'Error with Youtube URL',
                        'text': 'Please make sure the youtube URL is valid.',
                        'buttons': None
                    }, status=409)
                    
        else:
            url = url[0]
            if youtubeUrl is not None and url.url != youtubeUrl:
                try:
                    url.url = youtubeUrl
                    url.save()
                except:
                    return JsonResponse({
                        'heading': 'Error with Youtube URL',
                        'text': 'Please make sure the youtube URL is valid.',
                        'buttons': None
                    }, status=409)
            elif youtubeUrl is None:
                url.delete()
                
        original_noteList = NoteList.objects.filter(note=note).order_by('index')
            
        if original_noteList != noteList:
            if len(original_noteList) == 0 and len(noteList) !=0 :
                error_message = save_noteList_item(noteList, note)
                if error_message is not None:
                    return JsonResponse(error_message, status=409)
            elif len(original_noteList) != 0 and len(noteList) == 0 :
                for note in original_noteList:
                    if note.type == 'note':
                        note.content.delete()
                    else:
                        note.timestamp.delete()
            else:
                # if the new notelist is shorter than the original notelist, delete the extra notes from the original notelist
                if len(original_noteList) > len(noteList):
                    temp_list = original_noteList[len(noteList):]
                    original_noteList = original_noteList[:len(noteList)]
                    for note in temp_list:
                        if note.type == 'note':
                            note.content.delete()
                        else:
                            note.timestamp.delete()
                
                for index, item in enumerate(noteList):
                    find_item = NoteList.objects.filter(note=note, index=index)
                    if len(find_item) != 0:
                        # if item is the same type and id, edit it
                        if find_item[0].type == item['type'] and find_item[0].id == item['id']:
                            if find_item[0].type == 'note':
                                id = find_item[0].content.id
                            else:
                                id = find_item[0].timestamp.id
                                
                            error_message = edit_item(item=item, id=id)
                            if error_message is not None:
                                return JsonResponse(error_message, status=409)
                        else:
                            if find_item[0].type == 'note':
                                find_item[0].content.delete()
                            else:
                                find_item[0].timestamp.delete()

                        # if item dont exist, create new item and new notelist

                '''
                # go over all of the item in the new notelist
                for index, item in enumerate(noteList):
                    # check if the item exist and have the same type and id
                    temp_item = original_noteList[index]
                    if temp_item.type == item['type'] and temp_item.id == item['id']:
                        # edit note item without deleting
                        pass
                        # check the type and id
                    else:
                        if temp_item.type == 'note':
                            temp_item.content.delete()
                        else:
                            temp_item.timestamp.delete()
                        # if not the same delete the item

                    temp_item = NoteList.objects.filter(note=note, index=index)
                    if len(temp_item) == 0:
                        pass
                        '''
                    
            '''
            
            isnt it easier to just delete all of the note content and just make a new one?
            hmmmm
            
            if the original list is longer than the new list, slice up the extra, delete them
            iterate over the new list with index and value;
            if original_list[i] produces key error, create a new object??
            
            use index, item in enumerate(new notelist)
            search for notelist item with note=note, index = index
            if item exist, check if its the same type and id
            if exist, not same type and id, 
                - delete the existing item
                - create new item,
                - create new notelist item, index = index
            if exist
                - get the item
                - update the content
            if not exist,
                - that means the original notelist dont have item of that index, i.e: the new notelist is longer than the original notelist
                - create new item, 
                - create new notelist item, index=index
            '''
            
        return JsonResponse(note.serialize(), status=status.HTTP_200_OK)
    else:
        return HttpResponseRedirect(reverse("frontend:view_note", args=(noteID,)))