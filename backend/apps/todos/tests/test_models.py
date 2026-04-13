from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.todos.models import Todo

User = get_user_model()


class TestTodoModel(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="1234"
        )

    def test_create_todo(self):

        todo = Todo.objects.create(
            user=self.user,
            title="Testear"
        )

        self.assertEqual(todo.title, "Testear")
        self.assertEqual(todo.user, self.user)

    def test_completed_default_false(self):

        todo = Todo.objects.create(
            user=self.user,
            title="Hacer demo"
        )

        self.assertFalse(todo.completed)

    def test_string_rep(self):

        todo = Todo.objects.create(
            user=self.user,
            title="Testear mas"
        )

        self.assertEqual(str(todo), "Testear mas")

    def test_user_todos_count(self):

        Todo.objects.create(user=self.user, title="Test 1")
        Todo.objects.create(user=self.user, title="Test 2")

        todos = self.user.todos.all()

        self.assertEqual(todos.count(), 2)