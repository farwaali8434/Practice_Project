from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('practice.urls')),
    path('', include('frontend.urls'))
]
