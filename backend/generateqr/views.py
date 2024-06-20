# views.py

import os
import hashlib
import qrcode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import IdModel
from .serializers import QRCodeSerializer
from django.conf import settings

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

class GenerateQRView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = QRCodeSerializer(data=request.data)
        if serializer.is_valid():
            # Retrieve the latest IdModel instance
            id_model = IdModel.objects.latest('id')
            
            # Construct paths
            id_image_path = os.path.join(settings.MEDIA_ROOT, 'id_dblist', id_model.id_image.name)
            hashed_name = hash_filename(id_model.id_image.name)
            qr_code_path = os.path.join(settings.MEDIA_ROOT, 'id_qr', f'{hashed_name}.png')

            # Generate and save QR code
            create_qr_code(id_image_path, qr_code_path)

            # Update IdModel with QR code path
            id_model.qr_code = os.path.join('id_qr', f'{hashed_name}.png')
            id_model.save()

            return Response({'qr_url': settings.MEDIA_URL + id_model.qr_code}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
