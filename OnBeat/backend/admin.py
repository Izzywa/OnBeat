from django.contrib import admin

from .models import User, Note, NoteContent, YoutubeUrl, NoteTimestamp, NoteList

# Register your models here.
admin.site.register(User)
admin.site.register(Note)
admin.site.register(NoteContent)
admin.site.register(YoutubeUrl)
admin.site.register(NoteTimestamp)
admin.site.register(NoteList)