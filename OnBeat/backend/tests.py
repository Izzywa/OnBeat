from django.db import IntegrityError
from django.test import TestCase
from .models import User, Note, NoteContent, YoutubeUrl, NoteTimestamp
from datetime import timedelta

# Create your tests here.
class NoteTestCase(TestCase):
    def setUp(self):
        # create user
        user1 = User.objects.create(username="user1", email="user1@example.com", password="123456")
        user2 = User.objects.create(username="user2", email="user2@example.com", password="123456")
        
        # create note
        note1 = Note.objects.create(user=user1, title="Note1")
        note2 = Note.objects.create(user=user1, title="Note2")
        
        #create note content
        notecontent1 = NoteContent(note=note1, subheading="", content="This is content 1.")
        notecontent1.save()
        notecontent2 = NoteContent(note=note1, subheading="heading", content="content2")
        notecontent2.save()
        
        # create YoutubeUrl
        url = YoutubeUrl.objects.create(note=note1, url="https://www.youtube.com/watch?v=3dzBlSeCJNg&list=RDMM3dzBlSeCJNg&start_radio=1")
        
        # create timestamps
        d = timedelta(seconds=60)
        timestamp = NoteTimestamp(note=note1, timestamp=d, text="timestamp note")
        timestamp.save()    
    
    def test_user_note(self):
        try:
            user1 = User.objects.get(username="user1")
            self.assertTrue(True, "User exist")
        except User.DoesNotExist:
            self.assertTrue(False, "Could not create user")
            
        user2 = User.objects.get(username="user2")
        
        # test note count
        self.assertEqual(user1.note.count(), 2, "Note is not connected to user")
        
        # test note title
        note1 = user1.note.all().first()
        self.assertEqual(note1.title, "Note1", "Note title false")
        
        try:
            note1user1 = Note.objects.create(user=user2, title="Note1")
            note1user1.save()
        except IntegrityError:
            self.fail("Different user not allowed the same note title")
        
        # test if note title not unique
        try:
            note2 = Note.objects.create(user=user1, title="Note1")
            note2.save()
            self.fail("Notes could have the same title")
        except IntegrityError:
            self.assertTrue(True, "Note title must be unique")
            
           
    def test_note_content(self):
        # test Note content
        user1 = User.objects.get(username="user1")
        note1 = Note.objects.get(user=user1, title="Note1")
        note2 = Note.objects.get(user=user1, title="Note2")
        
        self.assertEqual(note1.content.all().count(),2, "Content count wrong")

        self.assertEqual(note2.content.all().count(),0 , "Content count wrong for note 2")
        
        # test youtube url
        self.assertIsNotNone(note1.youtubeURL, "Youtube url count wrong for note 1")
        try:
            url = note2.youtubeURL
            self.fail("url exist when it should not")
        except:
            self.assertTrue(True)
        
        # test timestamp
        self.assertEqual(note1.timestamp.all().count(), 1, "timestamp count wrong for note1")
        self.assertEqual(note2.timestamp.all().count(), 0, "timestamp count wrong for note2")
        
        t = note1.timestamp.first()
        self.assertEqual(t.timestamp, timedelta(seconds=60), f"timestamp is {t.timestamp} instead of {timedelta(seconds=60)}")