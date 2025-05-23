from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _

# Create your models here.

def validate_youtube_url(value):
    if value.startswith('https://www.youtube.com/watch?v=') or value.startswith('https://youtu.be/'):
        pass
    else:
        raise ValidationError(
            _('%(value)s is not valid youtube url.'),
            params={'value': value},
        )

class User(AbstractUser):
    pass

    def __str__(self):
        return self.username    

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="note")
    title = models.CharField(null=False, blank=False, max_length=200, validators=[MinLengthValidator(1, 'field must be minimum 1 character')])
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ("user", "title")
    
    def __str__(self):
        return self.title
    
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "title": self.title,
            "date_created": self.date_created.strftime("%b %d %Y, %I:%M %p"),
        
        }

class NoteContent(models.Model):
    note = models.ForeignKey(Note, related_name="content", on_delete=models.CASCADE)
    heading = models.CharField(blank=True, max_length=100)
    text = models.TextField(blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "note_id": self.note.id,
            "content_id": self.id,
            "heading": self.heading,
            "content": self.text,
            "date_created": self.date_created.strftime("%b %d %Y, %I:%M %p"),
            "date_modified": self.date_modified
        }
        
class YoutubeUrl(models.Model):
    note = models.OneToOneField(Note, related_name="youtubeURL", on_delete=models.CASCADE, unique=True)
    url = models.URLField(blank=False, validators=[validate_youtube_url])
    
    def serialize(self):
        return {
            "id": self.id,
            "note_id": self.note.id,
            "url_id": self.id,
            "url": self.url
        }
        
        
class NoteTimestamp(models.Model):
    note = models.ForeignKey(Note, related_name="timestamp", on_delete=models.CASCADE)
    timestamp = models.DurationField(blank=False)
    text = models.TextField(blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "note_id": self.note.id,
            "timestamp_id": self.id,
            "timestamp": self.timestamp.seconds,
            "text": self.text,
            "url": self.note.youtubeURL.url,
            "date_created": self.date_created.strftime("%b %d %Y, %I:%M %p"),
            "date_modified": self.date_modified
        }
    

class NoteList(models.Model):
    NOTE = "note"
    TIMESTAMP = "timestamp"
    
    TYPE_CHOICES = {
        (NOTE, "note"),
        (TIMESTAMP, "timestamp")
    }
    
    type = models.CharField(choices=TYPE_CHOICES, max_length=9)
    index = models.IntegerField(blank=False)
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="noteList")
    content = models.ForeignKey(NoteContent, on_delete=models.CASCADE,blank=True, null=True)
    timestamp = models.ForeignKey(NoteTimestamp, on_delete=models.CASCADE, blank=True, null=True)
    
    class Meta:
        unique_together = ("note", "index")
        
        constraints = [
            models.CheckConstraint(
                check=Q(type="note", timestamp=None, content__isnull=False) | Q(type="timestamp", content=None, timestamp__isnull=False),
                name="type and note object does not match"
            )
        ] 
        
    def serialize(self):
        if self.type == "note":
            content = {
                "heading": self.content.heading,
                "text": self.content.text
            }
        else:
            content = {
                "timestamp": self.timestamp.timestamp.seconds,
                "text": self.timestamp.text
            }
        
        return {
            "id": self.id,
            "type": self.type,
            "content": content
        }
        
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookmark")
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="bookmark")
    
    class Meta:
        unique_together = ("user", "note")
    
    def clean(self):
        if self.user != self.note.user:
            raise ValidationError("User should not be able to bookmark another user's note")
        return super().clean()        

    def serialize(self):
        try:
            youtubeURL = self.note.youtubeURL.url
        except:
            youtubeURL = None
            
        serialized_item = self.note.serialize()
        serialized_item['youtubeURL'] = youtubeURL
        return serialized_item
