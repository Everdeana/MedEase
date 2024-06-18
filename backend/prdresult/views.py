# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def receive_symptoms(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        symptoms = data.get('symptoms', [])
        # 여기서 받은 증상을 처리합니다.
        print("Received symptoms:", symptoms)
        return JsonResponse({'status': 'success', 'message': 'Symptoms received', 'symptoms': symptoms})
    return JsonResponse({'status': 'fail', 'message': 'Only POST requests are allowed'})
