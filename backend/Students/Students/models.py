from django.contrib.auth.models import AbstractUser
from django.db import models

# class CustomUser(AbstractUser):
    
#     ROLE_CHOICES = (
#         ('Staff', 'Staff'),
#         ('student', 'student')
#     )
#     city = models.CharField(max_length=100, blank=True, null=True)
#     email = models.EmailField(unique=True, max_length=191)
#     role = models.CharField(max_length=30, choices=ROLE_CHOICES, blank=True, null=True)
#     picture = models.ImageField(default="unknown.jpg", upload_to='media/', blank=True, null=True)
#     phone_number = models.CharField(max_length=15, blank=True, null=True)

#     def __str__(self):
#         return self.get_full_name()



class CustomUser(AbstractUser):

    ROLE_CHOICES = (
        ('Staff', 'Staff'),
        ('student', 'student')
    )

    email = models.EmailField(unique=True, max_length=191)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, blank=True, null=True)
    picture = models.ImageField(default="unknown.jpg", upload_to='media/', blank=True, null=True)
    
    def __str__(self):
        return self.get_full_name()

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    matricule = models.CharField(max_length=20, unique=True)
    major = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.user.get_full_name()

class Staff(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    hire_date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.user.get_full_name()