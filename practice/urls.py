from rest_framework import routers
from .views import UserViewSet, BookViewSet, RegisterAPI, LoginAPI, ImageViewSet, VideoViewSet
from django.urls import path, include
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('users', UserViewSet, "users")
router.register('books', BookViewSet, 'books')
router.register('images', ImageViewSet, 'images')
router.register('videos', VideoViewSet, 'videos')


urlpatterns = [
    url(r'api/', include(router.urls)),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view())
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
