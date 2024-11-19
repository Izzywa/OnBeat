from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Q
from django.utils import timezone
import uuid

# Create your models here.

class User(AbstractUser):
    pass

    def __str__(self):
        return self.username    

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="note")
    title = models.CharField(blank=False, max_length=250)
    date_created = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ("user", "title")
    
    def __str__(self):
        return self.title
    
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user,
            "title": self.title,
            "date_created": self.date_created.strftime("%b %d %Y, %I:%M %p")
        }

class NoteContent(models.Model):
    note = models.ForeignKey(Note, related_name="content", on_delete=models.CASCADE)
    subheading = models.CharField(blank=True, max_length=100)
    content = models.TextField(blank=False)
    date_created = models.DateField(auto_now_add=True)
    date_modified = models.DateField(auto_now=True)
    
    def serialize(self):
        return {
            "note_id": self.note.id,
            "content_uuid": self.uuid,
            "subheading": self.subheading,
            "content": self.content,
            "date_created": self.date_created,
            "date_modified": self.date_modified
        }
        
class YoutubeUrl(models.Model):
    note = models.ForeignKey(Note, related_name="youtubeURL", on_delete=models.CASCADE)
    url = models.URLField(blank=False)
    
    class Meta:
        unique_together = ("note", "url")
        
        
class NoteTimestamp(models.Model):
    note = models.ForeignKey(Note, related_name="timestamp", on_delete=models.CASCADE)
    timestamp = models.DurationField(blank=False)
    text = models.TextField(blank=False)
    date_created = models.DateField(auto_now_add=True)
    date_modified = models.DateField(auto_now=True)
    
class NoteList(models.Model):
    NOTE = "note"
    TIMESTAMP = "timestamp"
    
    TYPE_CHOICES = {
        (NOTE, "note"),
        (TIMESTAMP, "timestamp")
    }
    
    type = models.CharField(choices=TYPE_CHOICES, max_length=9)
    index = models.IntegerField(blank=False)
    note = models.ForeignKey(NoteContent, on_delete=models.CASCADE,blank=True, null=True)
    timestamp = models.ForeignKey(NoteTimestamp, on_delete=models.CASCADE, blank=True, null=True)
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                check=Q(type="note", timestamp=None, note__isnull=False) | Q(type="timestamp", note=None, timestamp__isnull=False),
                name="type and note object does not match"
            )
        ]