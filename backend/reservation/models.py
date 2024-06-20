# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Departments(models.Model):
    department_id = models.IntegerField(primary_key=True)
    department_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'departments'

class DiseaseDepartment(models.Model):
    disease = models.OneToOneField('Diseases', models.DO_NOTHING, primary_key=True)  # The composite primary key (disease_id, department_id) found, that is not supported. The first column is selected.
    department = models.ForeignKey(Departments, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'disease_department'
        unique_together = (('disease', 'department'),)


class Diseases(models.Model):
    disease_id = models.IntegerField(primary_key=True)
    disease_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'diseases'


class Hospitals(models.Model):
    hospital_id = models.IntegerField(primary_key=True)
    hospital_name = models.CharField(max_length=255)
    department = models.ForeignKey(Departments, models.DO_NOTHING, blank=True, null=True)
    off_days = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    specialist_info = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    operation_hours = models.CharField(max_length=255, blank=True, null=True)
    lunch_time = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hospitals'
