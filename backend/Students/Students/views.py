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
import json

@require_GET
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'status': 'CSRF cookie set'})

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
                return JsonResponse({
                    'authenticated': True,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'role': user.role,
                        # Add other user fields as needed
                    }
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
            serializer.save()
            return Response({"success": "Student registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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