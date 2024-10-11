from django.db import IntegrityError
from django.test import TestCase
from .models import User, Note, NoteContent

# Create your tests here.
class NoteTestCase(TestCase):
    def setUp(self):
        # create user
        user1 = User.objects.create(username="user1", email="user1@example.com", password="123456")
        user2 = User.objects.create(username="user2", email="user2@example.com", password="123456")
        
        # create note
        note1 = Note.objects.create(user=user1, title="Note1")
        note2 = Note.objects.create(user=user1, title="Note2")
        
        # create note content
        content1 = NoteContent.objects.create(subheading="", content="This is content1")
        content2 = NoteContent.objects.create(subheading="subheading2", content="This is content2")
        
        # add note content to note
        note1.content.add(content1)
        note1.content.add(content2)
        
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
            self.fail("Different user not allowe the same note title")
        
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
        note1_content1 = note1.content.first()
        
        note2.content.add(note1_content1)
        self.assertEqual(note2.content.all().count(),1 , "Content count wrong for note 2")
        note2_content1 = note2.content.first()
        
        self.assertEqual(note1_content1, note2_content1, "Not same content")