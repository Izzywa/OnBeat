from django.contrib import admin

from .models import User, Note, NoteContent, YoutubeUrl, NoteTimestamp, NoteList, Bookmark

class NoteListAdmin(admin.ModelAdmin):
    list_display = [
        "id", "note__id", "type", "index"
    ]
    
class NoteContentAdmin(admin.ModelAdmin):
    list_display = [
        "id", "note__id", "heading", "date_created", "date_modified"
    ]

class NoteAdmin(admin.ModelAdmin):
    list_display = [
        "id", "user__username", "title", "date_created", "date_modified"
    ]
    
class YoutubeUrlAdmin(admin.ModelAdmin):
    list_display = [
        "id", "note__id", "url"
    ]
    
class NoteTimestampAdmin(admin.ModelAdmin):
    list_display = [
        "id", "note__id", "timestamp", "date_created", "date_modified"
    ]

class BookmarkAdmin(admin.ModelAdmin):
    list_display = [
        "id", "user__username", "note__title"
    ]
    
# Register your models here.
admin.site.register(User)
admin.site.register(Note, NoteAdmin)
admin.site.register(NoteContent, NoteContentAdmin)
admin.site.register(YoutubeUrl, YoutubeUrlAdmin)
admin.site.register(NoteTimestamp, NoteTimestampAdmin)
admin.site.register(NoteList, NoteListAdmin)
admin.site.register(Bookmark, BookmarkAdmin)