from django.db import models
from django.contrib.auth.models import User



class Address(models.Model):
    id = models.AutoField(primary_key=True)
    full_address = models.CharField(max_length=1024)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    radius = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.full_address

class Company(models.Model):
    code = models.CharField(primary_key=True, max_length=10)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='company_images/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.DO_NOTHING, related_name='companies', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    code = models.CharField(primary_key=True, max_length=10)
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='departments')
    manager = models.ForeignKey('Employee', on_delete=models.DO_NOTHING, related_name='managed_departments', blank=True, null=True)
    parent_department = models.ForeignKey('self', on_delete=models.DO_NOTHING, related_name='sub_departments', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Rank(models.Model):
    level = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Employee(models.Model):
    code = models.CharField(primary_key=True, max_length=10)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='employees')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    position = models.CharField(max_length=100)
    rank = models.ForeignKey(Rank, on_delete=models.DO_NOTHING, related_name='employees', blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.DO_NOTHING, related_name='employees', blank=True, null=True)
    image = models.ImageField(upload_to='employee_images/', blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.DO_NOTHING, related_name='employees', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
