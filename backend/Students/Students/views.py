# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET
from rest_framework.views import APIView
from rest_framework import status
from .serializers import StudentRegistrationSerializer
from .serializers import StudentSerializer
from .models import Student
from .serializers import AbsenceSerializer, AbsencesSerializer ,MiniAbsencesSerializer
from rest_framework.renderers import JSONRenderer
from .models import Absences
from django.http import HttpResponse
import io
from reportlab.pdfgen import canvas
import openpyxl
from django.utils import timezone
from django.utils.html import strip_tags
from premailer import transform
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

import json

@require_GET
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'status': 'CSRF cookie set'})

class StudentDeleteView(APIView):
    def delete(self, request, student_id):
        try:
            student = Student.objects.get(pk=student_id)
            # Delete both the student profile and the associated user
            user = student.user
            student.delete()
            user.delete()
            return Response({"success": "Student deleted successfully"}, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            user = authenticate(
                request,
                username=data.get('username'),
                password=data.get('password')
            )
            if user is not None:
                login(request, user)
                if user.role == 'Staff':
                    return JsonResponse({
                        'authenticated': True,
                        'user': {
                            'id': user.id,
                            'username': user.username,
                            'email': user.email,
                            'role': user.role,
                            'full_name': user.get_full_name(),
                            
                        }
                    })
                return JsonResponse({
                    'authenticated': True,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'role': user.role,
                        'major': user.student.major,
                        'full_name': user.get_full_name(),
                        'matricule': user.student.matricule,
                        # Add other user fields as needed
                    },
                    
                })
            return JsonResponse({'authenticated': False}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Method not allowed'}, status=405)


class StudentRegistrationView(APIView):
    def post(self, request):
        serializer = StudentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            print("Serializer data:", serializer.validated_data)
            serializer.save()
            email_body = render_to_string('emails/newAcc.html', {'user': serializer.validated_data})
            email_html_inlined = transform(email_body)
            email = EmailMessage(
            'User Cridentials',
            email_html_inlined,
            'UniSite <saad989011@gmail.com>',
            [serializer.validated_data['email']]
            )
            email.content_subtype = 'html'  # Set content type to HTML
            email.send()
            return Response({"success": "Student registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class StudentListView(APIView):
    renderer_classes = [JSONRenderer]
    def get(self, request):
        students = Student.objects.all().select_related('user')
        serializer = StudentSerializer(students, many=True)
        
        return Response(serializer.data)



@api_view(['GET'])
def check_auth_view(request):
    if request.user.is_authenticated:
        return Response({
            'authenticated': True,
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'role': request.user.role,
                'full_name': request.user.get_full_name(),
                'picture': request.user.picture.url if request.user.picture else None
            }
        })
    return Response({'authenticated': False}, status=401)

class AbsenceRegister(APIView):
    def post(self, request):
        serializer = AbsenceSerializer(data=request.data)
        if serializer.is_valid():
            user = Student.objects.get(matricule=request.data['matricule'])
            print("User found:", user)
            email_body = render_to_string('emails/notifEmail.html',
                                           {'user': user , 'absence': serializer.validated_data})
            email_html_inlined = transform(email_body)
            email = EmailMessage(
            'Absence Notification',
            email_html_inlined,
            'UniSite <saad989011@gmail.com>',
            [user.guardianEmail]
            )
            email.content_subtype = 'html'  # Set content type to HTML
            email.send()
            serializer.save()
            
            return Response({"success": "absence registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AbsenceListView(APIView):

    def get(self, request):
        absences = Absences.objects.all()
        serializer = AbsencesSerializer(absences, many=True)
        print("Absences data:", serializer.data)
        return Response({'absences': serializer.data})
    

class AbsencesByMatricule(APIView):
    def get(self, request, id):
        try:
            student = Student.objects.get(user_id=id)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        
        absences = Absences.objects.filter(student=student)
        serializer = MiniAbsencesSerializer(absences, many=True)
        return Response({'absences': serializer.data}, status=status.HTTP_200_OK)
    





class AbsenceReportView(APIView):
    def post(self, request):
        format = request.data.get('format', 'pdf')
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')
        
        print("Format:", format)
        print("Student ID:", student_id)        
        print("Course ID:", course_id)
        absences = Absences.objects.all()
        print("Initial absences:", absences)


        if student_id:
            absences = absences.filter(student_id=student_id)
        print("Filtered absences:", absences)
        if course_id:
            absences = absences.filter(class_name=course_id)
        print("Filtered absences by course:", absences)
        

        if format == "pdf":
            return self.generate_pdf(absences)
        elif format == "excel":
            return self.generate_excel(absences)
        else:
            return Response({'error': 'Invalid format'}, status=status.HTTP_400_BAD_REQUEST)

    def generate_pdf(self, absences):
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer)
        y = 800
        p.drawString(100, y, "Absence Report")
        print("Generating PDF for absences:", absences)
        
        for absence in absences:
            y -= 20
            reason = absence.reason if absence.reason != "" else "No reason"
            p.drawString(100, y, f"{absence.student.user.get_full_name()} - {absence.class_name} - {absence.date} - {reason}")
        p.showPage()
        p.save()
        buffer.seek(0)
        return HttpResponse(buffer, content_type='application/pdf')

    def generate_excel(self, absences):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Absences"
        ws.append(["Student", "Course", "Date", "reason"])

        for absence in absences:
            student_name = (
                absence.student.user.get_full_name() 
            )
            course_name = (
                absence.class_name 
            )
            reason = absence.reason if absence.reason != "" else "No reason"
            date = absence.date.strftime("%Y-%m-%d") 

            ws.append([student_name, course_name, date, reason])

        output = io.BytesIO()
        wb.save(output)
        output.seek(0)

        response = HttpResponse(
        output.read(),
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
)
        response['Content-Disposition'] = 'attachment; filename=absence_report.xlsx'
        response['Content-Disposition'] = 'attachment; filename=absence_report.xlsx'
        return response
