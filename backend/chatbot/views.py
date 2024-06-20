from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# @api_view(['GET', 'POST'])

@csrf_exempt
def chatbot(request):
    # return HttpResponse('ChatBot')
    print("chatbot!")
    return JsonResponse(
        "벡엔드의 chatbot 데이터 API 넘기기", 
        safe=False, 
        json_dumps_params={'ensure_ascii':False},
        status=200
        )