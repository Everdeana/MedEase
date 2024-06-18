"""
URL configuration for MedEase project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# example_app 가동용 나중에 삭제
# from example_app.views import hello
# from example_app.views import hello_rest_api

urlpatterns = [
    path("admin/", admin.site.urls),
    # example_app 가동용 나중에 삭제
    # path('hello/', hello),
    # path('api/hello/', hello_rest_api, name='hello_rest_api'),
    path('api/', include('chatbot.urls')),
    path("example_app/", include("example_app.urls")),
    path('idcard/', include("idcard.urls")),
    path('api/', include('prediction.urls')),
    path('web/', include('web.urls')),
    # path('api/prediction/', include('prdresult.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# static
urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)