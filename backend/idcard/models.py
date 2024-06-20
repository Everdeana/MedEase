# idcard/models.py
from django.db import models

# Create your models here.
class IdModel(models.Model):
    file = models.FileField(upload_to='id_dblist/')
    title = models.TextField(default=' ')
    
    