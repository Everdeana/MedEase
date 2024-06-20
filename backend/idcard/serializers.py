# api/serializers.py

from rest_framework import serializers
from .models import IdModel

class IdModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdModel
        fields = '__all__'  # 모든 필드를 포함하거나 필요한 필드만 지정할 수 있음
        
