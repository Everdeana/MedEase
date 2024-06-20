# serializers.py

from rest_framework import serializers
from .models import IdModel
import qrcode
import os
from django.conf import settings
import hashlib

class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdModel
        fields = ['id']

    def create(self, validated_data):
        id_model = IdModel.objects.get(id=validated_data['id'])
        id_image_path = os.path.join(settings.MEDIA_ROOT, 'id_dblist', id_model.id_image.name)

        hashed_name = hash_filename(id_model.id_image.name)
        qr_code_path = os.path.join(settings.MEDIA_ROOT, 'id_qr', f'{hashed_name}.png')

        # QR 코드 생성 및 저장
        create_qr_code(id_image_path, qr_code_path)

        # QR 코드 경로를 모델에 저장
        id_model.qr_code = qr_code_path
        id_model.save()

        return id_model

def hash_filename(filename):
    """Generate a SHA-256 hash for a given filename."""
    sha256 = hashlib.sha256()
    sha256.update(filename.encode('utf-8'))
    return sha256.hexdigest()

def create_qr_code(data_path, path):
    """Create a QR code containing the given data and save it to the specified path."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data_path)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(path)
