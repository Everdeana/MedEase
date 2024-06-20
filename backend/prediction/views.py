from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import os
import joblib
import numpy as np
import pandas as pd
import openai
from .apiKey import OPENAI_API_KEY

# 직접 생성한 Model 사용 -> Table 사용
from .models import PrdModels # 추가

# Create your views here.

def prdV1(request):
	return HttpResponse("API v1.0")

def prdV2(request):
	return HttpResponse("API v2.0")

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

# 모델 및 인코더 로드
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'prediction', 'model', 'disease_prediction_model.joblib')
mlb_path = os.path.join(BASE_DIR, 'prediction', 'model', 'mlb.joblib')
model = joblib.load(model_path)
mlb = joblib.load(mlb_path)

# OpenAI API 설정
openai.api_key = OPENAI_API_KEY

def predict_disease(symptoms, model, mlb):
    input_data = pd.DataFrame([0] * len(mlb.classes_), index=mlb.classes_).T
    for symptom in symptoms:
        if symptom in input_data.columns:
            input_data[symptom] = 1
    probs = model.predict_proba(input_data)
    top3 = sorted(zip(model.classes_, probs[0]), key=lambda x: x[1], reverse=True)[:3]
    return top3

@csrf_exempt
def prediction_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        symptoms = data.get('symptoms', [])
        print("Received symptoms:", symptoms)
        
        # 예측 수행
        predictions = predict_disease(symptoms, model, mlb)
        result = [
            {"disease": disease, "probability": round(probability * 100, 2)}
            for disease, probability in predictions
        ]
        
        return JsonResponse({'status': 'success', 'predictions': result})
    else:
        return JsonResponse({'status': 'fail', 'message': 'Only POST requests are allowed'})

@csrf_exempt
def get_advice(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        disease = data.get('disease', '')

        if not disease:
            return JsonResponse({'status': 'fail', 'message': 'Disease is required'})

        # ChatGPT API 호출
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",  # 최신 모델 사용
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Please provide simple advice for the disease in korean: {disease}"}
                ],
                max_tokens=250
            )
            advice = response.choices[0].message.content.strip()
            return JsonResponse({'status': 'success', 'advice': advice})
        except Exception as e:
            print(f"Error calling OpenAI API: {e}")
            return JsonResponse({'status': 'fail', 'message': str(e)})
    else:
        return JsonResponse({'status': 'fail', 'message': 'Only POST requests are allowed'})



# @csrf_exempt
# def prediction_view(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         symptoms = data.get('symptoms', [])
#         print("Received symptoms:", symptoms)
#         return JsonResponse({'status': 'success', 'symptoms': symptoms})
#     else:
#         return JsonResponse({'status': 'fail', 'message': 'Only POST requests are allowed'})




@csrf_exempt
def prediction(request):
    return JsonResponse(
        "벡엔드의 prediction 데이터 API 넘기기", 
        safe=False, 
        json_dumps_params={'ensure_ascii':False},
        status=200
    )

