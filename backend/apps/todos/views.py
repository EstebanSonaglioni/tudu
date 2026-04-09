from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer
from apps.todos.service import get_user_todos
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


search_param = openapi.Parameter(
    "search",
    openapi.IN_QUERY,
    description="Filtrar por texto en el título",
    type=openapi.TYPE_STRING,
)

date_param = openapi.Parameter(
    "date",
    openapi.IN_QUERY,
    description="Filtrar por fecha de creación (YYYY-MM-DD)",
    type=openapi.TYPE_STRING,
)
todo_id_param = openapi.Parameter(
    "id",
    openapi.IN_PATH,
    description="ID del todo",
    type=openapi.TYPE_INTEGER,
    required=True,
)





@swagger_auto_schema(
    method="GET",
    operation_description="Lista los todos del usuario autenticado",
    manual_parameters=[search_param, date_param],
    responses={
        200: TodoSerializer(many=True),
        404: "Todo not found",
        400: "Invalid request"
    }
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_user_todos(request):

    search = request.GET.get("search")
    date_str = request.GET.get("date")

    try:
        todos = get_user_todos(
            user=request.user,
            search=search,
            date_str=date_str
        )

        if not todos.exists():
            return Response("Todo not found", status=404)

        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)



@swagger_auto_schema(
    method="POST",
    request_body=TodoSerializer
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_todo(request):

    serializer = TodoSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=400)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def complete_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id, user=request.user)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)

    if todo.completed:
        return Response({"message": "Todo already completed"}, status=status.HTTP_400_BAD_REQUEST)

    todo.completed = True
    todo.save()

    return Response({"message": f"Todo {todo_id} marked as completed"}, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="DELETE",
    operation_description="Elimina el todo indicado por ID",
    responses={
        200: "Todo deleted",
        404: "Todo not found"
    }
)
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id, user=request.user)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)

    todo.delete()
    return Response({"message": f"Todo {todo_id} deleted"}, status=status.HTTP_200_OK)
