from django.urls import path
from .views import create_todo,  delete_todo, complete_todo,  list_user_todos

urlpatterns = [
    path("get/", list_user_todos, name="list-user-todos"),
    path("create/", create_todo, name="create-todo"),
    path("delete/<int:todo_id>/", delete_todo, name="delete-todo"),
    path("complete/<int:todo_id>/", complete_todo, name="complete-todo"),
]