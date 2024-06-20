# idcard/urls.py

from django.urls import path
from .views import IdModelListCreate
from . import views
from django.urls import path




urlpatterns = [
    path('idcard/', views.api),
    path('idmodels/', IdModelListCreate.as_view(), name='idmodel-list-create'),
]

