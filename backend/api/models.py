from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver

class UserProfile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    user_id = models.CharField(primary_key=True, max_length=100)
    user_name = models.CharField(unique=True, max_length=100, null=True)
    user_pw = models.CharField(max_length=100, blank=True, null=True)
    user_gender = models.CharField(max_length=10, blank=True, null=True)
    user_age = models.CharField(max_length=10, blank=True, null=True)
    user_email = models.CharField(max_length=100, blank=True, null=True)
    user_phone = models.CharField(max_length=21, blank=True, null=True)
    enrolldate = models.DateField(blank=True, null=True)
    delflag = models.CharField(max_length=5, blank=True, null=True)
    faceid = models.TextField(blank=True, null=True)
    user_qr = models.CharField(max_length=255, blank=True, null=True)
    sub = models.CharField(unique=True, max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'UserProfile'
