from rest_framework import serializers
from .models import User, Book, Image, Video
from django.contrib.auth import authenticate
from django.contrib.auth.models import Permission
from django.db import transaction


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('codename',)


class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'read_book',
                  'update_book', 'delete_book', 'is_staff', 'images')


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('user', 'image')

    def create(self, validated_data):
        image = Image.objects.create(
            image=validated_data['image'], user=validated_data['user'])
        return image


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('user', 'video')

    def create(self, validated_data):
        video = Video.objects.create(
            video=validated_data['video'], user=validated_data['user'])
        return image

class RegisterSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password',  'username', 'read_book',
                  "update_book", 'delete_book', 'is_staff', 'images', 'videos')
        extra_kwargs = {'password': {'write_only': True}}


    @transaction.atomic()
    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'],
                                        password=validated_data['password'], read_book=validated_data['read_book'],
                                        delete_book=validated_data['delete_book'],  update_book=validated_data['update_book'],
                                        is_staff=validated_data['is_staff'])

    

        images = self.context.get('view').request.FILES
        for image in images.getlist('images'):
            Image.objects.create(image=image, user=user)
        videos = self.context.get('view').request.FILES
        for video in videos.getlist('videos'):
            Video.objects.create(video=video, user=user)

        return user


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')

