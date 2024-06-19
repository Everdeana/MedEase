from django.urls import path, include
from . import views

urlpatterns = [
    # v1 API
    path('v1/', views.prdV1, name = 'prdV1'),
		# v2 API
    path('v2/', views.prdV2, name = 'prdV2'),
		# v1 API
    path('getprdmodel/', views.getprdmodel, name = 'getprdmodel'),
    path('prediction/', views.prediction_view, name='prediction_view'),
    path('get_advice/', views.get_advice, name='get_advice'),
    path('prediction/', views.prediction),
    # path('prediction/prdresult/', views.predict_result, name='predict_result'),
    # myproject/urls.py
    
]
