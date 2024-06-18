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

@csrf_exempt
def prediction(request):
    return JsonResponse(
        "벡엔드의 prediction 데이터 API 넘기기", 
        safe=False, 
        json_dumps_params={'ensure_ascii':False},
        status=200
    )

@csrf_exempt
def predict_result(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        symptoms = data.get('symptoms', [])
        
        # 여기서 증상 데이터를 기반으로 예측을 수행하고 결과를 생성합니다.
        result = "바이러스 감염일 가능성이 있습니다."  # 예측 결과 예시

        return JsonResponse({'result': result})
    return JsonResponse({'error': 'Invalid request'}, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def prediction_result(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        symptoms = data.get('symptoms', [])
        
        # Your prediction logic here, for now returning dummy data
        result = {
            'disease': '바이러스 감염',
            'second_disease': '감기',
            'third_disease': '파상풍',
            'prevention': '비타민C'
        }
        return JsonResponse(result)
    return JsonResponse({'error': 'Invalid request'}, status=400)
