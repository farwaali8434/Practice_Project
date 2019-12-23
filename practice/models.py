from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    add_book = models.BooleanField('student status', default=False)
    delete_book = models.BooleanField('delete status', default=False)
    update_book = models.BooleanField('update status', default=False)
    read_book = models.BooleanField('read status', default=False)

class Book(models.Model):
    book_name = models.CharField(max_length=50)
    book_author = models.CharField(max_length=50)
