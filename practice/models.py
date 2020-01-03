from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    add_book = models.BooleanField('student status', default=False)
    delete_book = models.BooleanField('delete status', default=False)
    update_book = models.BooleanField('update status', default=False)
    read_book = models.BooleanField('read status', default=False)

    @property
    def images(self):
        return self.images_set.all()
    @property
    def videos(self):
        return self.videos_set.all()

class Book(models.Model):
    book_name = models.CharField(max_length=50)
    book_author = models.CharField(max_length=50)

class Image(models.Model):
    image = models.ImageField(upload_to='post_images')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE, related_name='images')

class Video(models.Model):
    video = models.FileField(upload_to='videos')
    user = models.ForeignKey('User', to_field='username', on_delete=models.CASCADE, related_name='videos')
