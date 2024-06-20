
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import IdModel
from .serializers import IdModelSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.auth.decorators import login_required
import qrcode
import hashlib
import os




@csrf_exempt
def api(request):
    print("id 실행 완료")
    return JsonResponse({"message": "ID 실행 완료"}, safe=False, json_dumps_params={'ensure_ascii':False}, status=200)


class IdModelListCreate(APIView):
    def get(self, request, format=None):
        idmodels = IdModel.objects.all()
        serializer = IdModelSerializer(idmodels, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = IdModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

