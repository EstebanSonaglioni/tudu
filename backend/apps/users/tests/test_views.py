from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from apps.todos.models import Todo

class TestAuth(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="123456"
        )

        Todo.objects.create(title="Task 1", user=self.user)
        Todo.objects.create(title="Task 2", user=self.user)

        self.client.login(username="testuser", password="123456")

    def test_post_login(self):
        response = self.client.post("/api/auth/login/",data={"username":"testuser","password":"123456"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_post_login_fail(self):
        response = self.client.post("/api/auth/login/",data={"username":"testuser","password":"asdfg"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_register(self):
        response = self.client.post("/api/users/register/", {"username":"testuser2","password":"asdfg"})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    
    def test_post_register_duplicated(self):
        response = self.client.post("/api/users/register/", {"username":"testuser","password":"asdfg"})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    
    def test_post_register_empty_user(self):
        response = self.client.post("/api/users/register/", {"username":"","password":"asdfg"})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    
    def test_post_register_empty_password(self):
        response = self.client.post("/api/users/register/", {"username":"validuser","password":""})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)