from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import os


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def submit_symptoms(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # 데이터 처리 로직 추가
        return JsonResponse({'status': 'success', 'data': data})
    return JsonResponse({'error': 'Invalid request'}, status=400)

# 직접 생성한 Model 사용 -> Table 사용
from .models import PrdModels # 추가

# Create your views here.

def prdV1(request):
	return HttpResponse("API v1.0")

def prdV2(request):
	return HttpResponse("API v2.0")

# def getprdmodel(request):
# 	sendData = {
# 		"name" : "testName",
# 		"image" : request.build_absolute_uri(os.path.join(settings.MEDIA_URL, 'medi1.png')),
# 		"item" : "testItem",
# 		"shop" : "testShop",
# 		"doc" : "testDoc",
# 		"dates" : "2024-06-16"
# 	}
# 	return JsonResponse(sendData, safe = False, json_dumps_params = {'ensure_ascii':False}, status = 200)

def getprdmodel(request):
	# DB
	# select * from api_refmodels
	datas = PrdModels.objects.all()

	sendData = []

	for data in datas:
		print(data)

		sendData.append({
			"name" : data.names,
			"image" : data.image,
			"item" : data.item,
			"shop" : data.shop,
			"doc" : data.doc,
			"dates" : data.dates
		})
	return JsonResponse(sendData, safe = False, json_dumps_params = {'ensure_ascii':False}, status = 200)
	
# prediction/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def prediction_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        symptoms = data.get('symptoms', [])
        print("Received symptoms:", symptoms)
        return JsonResponse({'status': 'success', 'symptoms': symptoms})
    else:
        return JsonResponse({'status': 'fail', 'message': 'Only POST requests are allowed'})
