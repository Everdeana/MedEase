from django.urls import path
from .views import GenerateQRView #IdListView

urlpatterns = [
    path('generate_qr/', GenerateQRView.as_view(), name='generate_qr'),
    # path('id_list/', IdListView.as_view(), name='id_list'),
]
