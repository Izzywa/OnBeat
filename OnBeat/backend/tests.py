from django.db import IntegrityError, transaction
from django.test import TestCase
from .models import User, Note, NoteContent, YoutubeUrl, NoteTimestamp, NoteList
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
        notecontent1 = NoteContent(note=note1, heading="", text="This is content 1.")
        notecontent1.save()
        notecontent2 = NoteContent(note=note1, heading="heading", text="content2")
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
            
        # test youtube url validation
        try:
            with transaction.atomic():
                test_url = YoutubeUrl(note=note1, url="https://stackoverflow.com/questions/7366363/adding-custom-django-model-validation")
                test_url.save()
            self.fail("Should not save invalid youtube url")
        except:
            pass
        
        try:
            with transaction.atomic():
                test_url = YoutubeUrl(note=note2, url="https://www.youtube.com/watch?v=n4DN7_IFjEo&t=1418s")
                test_url.save()
            pass
        except:
            self.fail("This should be a valid url")
            
        test_url.delete()
        try:
            with transaction.atomic():
                test_url = YoutubeUrl(note=note2, url="https://youtu.be/n4DN7_IFjEo?si=pot68ZTzFptwIYHp")
                test_url.save()
            pass
        except:
            self.fail("This should be a valid url")
        
        # test timestamp
        self.assertEqual(note1.timestamp.all().count(), 1, "timestamp count wrong for note1")
        self.assertEqual(note2.timestamp.all().count(), 0, "timestamp count wrong for note2")
        
        t = note1.timestamp.first()
        self.assertEqual(t.timestamp, timedelta(seconds=60), f"timestamp is {t.timestamp} instead of {timedelta(seconds=60)}")
        
    def test_noteList(self):
        user1 = User.objects.get(username="user1")
        note1 = Note.objects.get(user=user1, title="Note1")
        notecontent1 = note1.content.first()
        timestamp1 = note1.timestamp.first()
        
        # test if can have both foreignkey
        try:
            with transaction.atomic():
                notelist1 = NoteList(type=NoteList.NOTE, index=0, note=note1, content=notecontent1, timestamp=timestamp1)
                notelist1.save()
            self.fail("should not be able to put both note and timestamp")
        except IntegrityError:
            pass
        
        # test if can have mismatching type
        try:
            with transaction.atomic():
                notelist1 = NoteList(type=NoteList.NOTE, index=0, note=note1, timestamp=timestamp1)
                notelist1.save()
            self.fail("if type is note, should not be able to insert timestamp")
        except IntegrityError:
            pass
        
        notelist1 = NoteList(type=NoteList.NOTE, index=0, note=note1, content=notecontent1)
        notelist1.save()
        # test if can have same index
        try:
            with transaction.atomic():
                notelist2 = NoteList(type=NoteList.TIMESTAMP, index=0, note=note1, timestamp=timestamp1)
                notelist2.save()
            self.fail("index should be different")
        except IntegrityError:
            pass
        
        notelist2 = NoteList(type=NoteList.TIMESTAMP, index=1, note=note1, timestamp=timestamp1)
        notelist2.save()
        
        # test list
        list = NoteList.objects.filter(note=note1).order_by('index')
        self.assertEqual(len(list), 2, "not right notelist length")
        self.assertEqual(list[0].content, notecontent1, "not the right content" )
        self.assertEqual(list[1].timestamp, timestamp1, "not the right timestamp")