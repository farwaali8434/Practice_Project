from rest_framework import routers
from .views import UserViewSet, BookViewSet, RegisterAPI, LoginAPI
from django.urls import path, include
from django.conf.urls import  url

router = routers.DefaultRouter()
router.register('users', UserViewSet, "users")
router.register('books', BookViewSet, 'books')
# router.register('api/auth/register', RegisterAPI.as_view(), 'register')

urlpatterns = [url(r'api/',include(router.urls)),
path('api/auth/register', RegisterAPI.as_view()),
path('api/auth/login', LoginAPI.as_view())]
# urlpatterns = [
# path('api/auth/register', RegisterAPI.as_view()),
# path('api/auth/login', LoginAPI.as_view()),
# path('api/auth/user', UserAPI.as_view()),
# path('api/users/', UserViewSet)
# ]
# urlpatterns=[
#     path("api/users/", UserViewSet.as_view({'get':'list'})),
#     path('api/auth/register', RegisterAPI.as_view())
# ]
