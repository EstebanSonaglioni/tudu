
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserCreateSerializer
from drf_yasg import openapi

token_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "refresh": openapi.Schema(
            type=openapi.TYPE_STRING,
            description="Token para hacer refresh"
        ),
        "access": openapi.Schema(
            type=openapi.TYPE_STRING,
            description="Token de autenticación"
        )
    }
)

user_created_response = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(
            type=openapi.TYPE_INTEGER,
            description="ID del usuario creado"
        ),
        "username": openapi.Schema(
            type=openapi.TYPE_STRING,
            description="Username"
        )
    }
)

# {
#   "id": 3,
#   "username": "demouser2"
# }

@swagger_auto_schema(
    method='post',
    request_body=UserCreateSerializer,
    operation_description="Registrar un usuario nuevo",
    responses={
        200: user_created_response
    }
)
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@swagger_auto_schema(
    method='post',
    request_body=UserSerializer,
    operation_description="Ingresar con usuario y contraseña",
    responses={
        200: token_response,
        401: "Invalid credentials"
    }
)
@api_view(['POST'])
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        return Response({"message": "Login successful"})

    return Response({"error": "Invalid credentials"}, status=401)