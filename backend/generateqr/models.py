# models.py

from django.db import models

class IdModel(models.Model):
    id_image = models.ImageField(upload_to='id_dblist')
    qr_code = models.ImageField(upload_to='id_qr', blank=True)

    def __str__(self):
        return f"ID: {self.id}"
