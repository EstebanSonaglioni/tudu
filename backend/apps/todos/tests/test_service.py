from django.test import TestCase
from django.contrib.auth import get_user_model
from datetime import datetime
from apps.todos.models import Todo
from apps.todos.service import get_user_todos

User = get_user_model()


class TestTodoService(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="1234"
        )

        self.other_user = User.objects.create_user(
            username="otheruser",
            password="1234"
        )

        self.todo1 = Todo.objects.create(
            user=self.user,
            title="Limpiar auto"
        )

        self.todo2 = Todo.objects.create(
            user=self.user,
            title="Usar Django"
        )

        Todo.objects.create(
            user=self.other_user,
            title="Mas tests"
        )

    def test_get_user_todos_returns_only_user_todos(self):

        todos = get_user_todos(self.user)

        self.assertEqual(todos.count(), 2)

    def test_search_filter(self):

        todos = get_user_todos(self.user, search="auto")

        self.assertEqual(todos.count(), 1)
        self.assertEqual(todos.first().title, "Limpiar auto")

    def test_filter_by_date(self):

        date_str = self.todo1.created_at.strftime("%Y-%m-%d")

        todos = get_user_todos(self.user, date_str=date_str)

        self.assertTrue(todos.count() >= 1)

    def test_search_and_date_filter(self):

        date_str = self.todo1.created_at.strftime("%Y-%m-%d")

        todos = get_user_todos(
            self.user,
            search="auto",
            date_str=date_str
        )

        self.assertEqual(todos.count(), 1)

    def test_invalid_date_format(self):

        with self.assertRaises(ValueError):
            get_user_todos(
                self.user,
                date_str="invalid-date"
            )

    def test_search_is_case_insensitive(self):

        todos = get_user_todos(self.user, search="AUTO")

        self.assertEqual(todos.count(), 1)