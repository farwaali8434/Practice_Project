from rest_framework import routers
from .views import UserViewSet, BookViewSet, RegisterAPI, LoginAPI, loggedInUser
from django.urls import path, include
from django.conf.urls import url

router = routers.DefaultRouter()
router.register('users', UserViewSet, "users")
router.register('books', BookViewSet, 'books')


urlpatterns = [
    url(r'api/', include(router.urls)),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view())
]
