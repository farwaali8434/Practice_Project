from django.shortcuts import render
from .models import User, Book
from  rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework import viewsets, permissions, generics, mixins
from .serializers import UserSerializer,BookSerializer, RegisterSerializer, LoginSerializer
from django.http import HttpResponse
import jwt
import json


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

   
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            payload = {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'password': user.password,
                'read_book': user.read_book,
                'delete_book': user.delete_book,
                'update_book': user.update_book,
                'is_staff':user.is_staff
            }
            # User = UserSerializer(user, context=self.get_serializer_context()).data
            jwt_token = {'token': jwt.encode(
                payload, "SECRET_KEY").decode('utf-8')}
            return HttpResponse(
                json.dumps(jwt_token),
                status=200,
                content_type="application/json"
            )


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
       
        payload = {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'password': user.password,
            'read_book': user.read_book,
            'delete_book': user.delete_book,
            'update_book': user.update_book,
            'is_staff':user.is_staff
        }
        jwt_token = {'token': jwt.encode(
            payload, "SECRET_KEY").decode('utf-8')}
        return HttpResponse(
            json.dumps(jwt_token),
            status=200,
            content_type="application/json"
        )
