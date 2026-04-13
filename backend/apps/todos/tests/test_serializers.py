from django.test import TestCase
from django.contrib.auth.models import User
from apps.todos.models import Todo
from apps.todos.serializers import TodoSerializer


class TestTodoSerializer(TestCase):

    def setUp(self):
        
        self.user = User.objects.create_user(
            username="test",
            password="1234"
        )

        self.todo = Todo.objects.create(
            title="Todo Test",
            completed=False,
            user=self.user
        )

    def test_serializer_fields(self):

        serializer = TodoSerializer(instance=self.todo)
        data = serializer.data

        self.assertEqual(data["title"], "Todo Test")
        self.assertEqual(data["completed"], False)
        self.assertIn("id", data)
        self.assertIn("created_at", data)
    
    def test_serializer_create(self):

        data = {
            "title": "New task",
            "completed": False
        }

        serializer = TodoSerializer(data=data)

        self.assertTrue(serializer.is_valid())

    def test_title_required(self):

        data = {
            "completed": False
        }

        serializer = TodoSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)

    def test_completed_field(self):

        data = {
            "title": "Task",
            "completed": True
        }

        serializer = TodoSerializer(data=data)

        self.assertTrue(serializer.is_valid())
        self.assertTrue(serializer.validated_data["completed"])