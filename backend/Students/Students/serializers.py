# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student

CustomUser = get_user_model()

class StudentRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    city = serializers.CharField(required=False, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    matricule = serializers.CharField(required=True)
    major = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        # Create the CustomUser first
        user_data = {
            'username': validated_data['username'],
            'email': validated_data['email'],
            'password': validated_data['password'],
            'first_name': validated_data['first_name'],
            'last_name': validated_data['last_name'],
            'role': 'student'
        }
        
        user = CustomUser.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            role='student'
        )
        
        # Then create the Student profile
        student = Student.objects.create(
            user=user,
            city=validated_data.get('city', ''),
            phone_number=validated_data.get('phone_number', ''),
            matricule=validated_data['matricule'],
            major=validated_data.get('major', '')
        )
        
        return student
