from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    
    ROLE_CHOICES = (
        ('Staff', 'Staff'),
        ('student', 'student')
    )
    city = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, max_length=191)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    picture = models.ImageField(default="unknown.jpg", upload_to='media/', blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.get_full_name()
