# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student
from datetime import datetime
from .models import Student
from .models import Absences
import random

random_number = random.randint(1, 100)
student_count = Student.objects.count()
next = student_count + random_number
current_year = datetime.now().year
CustomUser = get_user_model()

class StudentRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    city = serializers.CharField(required=False, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    guardianEmail = serializers.EmailField(required=False, allow_blank=True)
    major = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        # Create the CustomUser first
        print("Creating user with data:", validated_data)
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
        first_letter = validated_data['city'][0].upper()
        # Then create the Student profile
        student = Student.objects.create(
            user=user,
            city=validated_data.get('city', ''),
            phone_number=validated_data.get('phone_number', ''),
            guardianEmail=validated_data.get('guardianEmail', ''),
            matricule = f"{first_letter}-{current_year}-{next:04d}" ,
            major=validated_data.get('major', '')
        )
        
        return student


class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name')
    email = serializers.CharField(source='user.email')
    id = serializers.CharField(source='user_id') 
    
    class Meta:
        model = Student
        fields = ['id', 'matricule', 'full_name', 'email', 'major', 
                  'city', 'phone_number', 'guardianEmail']

    def get_full_name(self, obj):
        return obj.user.get_full_name()

    def get_email(self, obj):
        return obj.user.email



class AbsencesSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    matricule = serializers.CharField(source='student.matricule', read_only=True)
    class Meta:
        model = Absences
        fields = ['matricule', 'date', 'class_name', 'full_name', 'reason']


class AbsenceSerializer(serializers.ModelSerializer):
    matricule = serializers.CharField(write_only=True)
    date= serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=True)
    reason = serializers.CharField(required=False, allow_blank=True)
    class_name = serializers.CharField(required=True)
    
    class Meta:
        model = Absences
        fields = [ 'matricule', 'date', 'class_name', 'reason']
        
    
    def create(self, validated_data):
        matricule = validated_data.pop('matricule')
        student = Student.objects.get(matricule=matricule)
        return Absences.objects.create(student=student,**validated_data)
    

class MiniAbsencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Absences
        fields = '__all__'

class AbsenceStatsSerializer(serializers.ModelSerializer):
    matricule = serializers.CharField(source='student.matricule', read_only=True)
    full_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    class Meta:
        model = Absences
        fields = ['date', 'class_name', 'reason', 'full_name', 'matricule']

    