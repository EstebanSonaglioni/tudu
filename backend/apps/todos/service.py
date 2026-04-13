from datetime import datetime
from apps.todos.models import Todo


def get_user_todos(user, search=None, date_str=None):
    todos = Todo.objects.filter(user=user)

    if search:
        todos = todos.filter(title__icontains=search)

    if date_str:
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
            todos = todos.filter(created_at__date=date_obj)
        except ValueError:
            raise ValueError("Invalid date format. Use YYYY-MM-DD.")

    return todos