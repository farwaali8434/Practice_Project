from rest_framework import serializers
from .models import User, Book
from django.contrib.auth import authenticate
from django.contrib.auth.models import Permission


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('codename',)

class UserSerializer(serializers.ModelSerializer):
    # user_permissions = PermissionSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password','read_book', 'update_book', 'delete_book', 'is_staff')
        
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password',  'username', 'read_book', "update_book", 'delete_book', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'],
                                        password=validated_data['password'], read_book=validated_data['read_book'],
                                        delete_book=validated_data['delete_book'],  update_book=validated_data['update_book'], 
                                        is_staff=validated_data['is_staff'])
                                    
        book_permissions = []
        if user.read_book:
            book_permissions.append(Permission.objects.get(codename='view_book'))
        if user.delete_book:
            book_permissions.append(Permission.objects.get(codename='delete_book'))
        if user.update_book:
            book_permissions.append(Permission.objects.get(codename='change_book'))
        user.user_permissions.add(*book_permissions)   
        user.save()
        return user
   

class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')
