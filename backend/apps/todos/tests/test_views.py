from datetime import datetime
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from apps.todos.models import Todo
from rest_framework.test import APIClient

class TestToDos(APITestCase):


    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(
            username="testuser",
            password="123456"
        )

        Todo.objects.create(title="Prueba 1", user=self.user)
        Todo.objects.create(title="Test 2", user=self.user)

        self.client.force_authenticate(user=self.user)

    # TEST /get/
    
    def test_get_todos(self):
        response = self.client.get("/api/todos/get/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data),2)
    
    def test_get_todos_filtered_by_search(self):
        response = self.client.get("/api/todos/get/?search=1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data),1)
    
    def test_get_todos_filtered_by_search_not_found(self):
        response = self.client.get("/api/todos/get/?search=null")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    
    def test_get_todos_filtered_by_date(self):
        response = self.client.get(f"/api/todos/get/?date={datetime.now().date()}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data),2)
    

    def test_get_todos_filtered_by_date_not_found(self):
        response = self.client.get(f"/api/todos/get/?date=1999-01-01")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)    

    # TEST POST /create/

    def test_post_create_ok(self):
        response = self.client.post("/api/todos/create/",{"title":"Creado desde test","completed":False})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_post_create_fails_if_empty_title(self):
        response = self.client.post("/api/todos/create/",{"title":"","completed":False})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_fails_if_completed_not_bool(self):
        response = self.client.post("/api/todos/create/",{"title":"ok","completed":1234})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    # TEST PATCH MARK COMPLETED /complete

    def test_mark_as_completed(self):
        response = self.client.patch("/api/todos/complete/1/")
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_mark_as_completed_fails_with_invalid_id(self):
        response = self.client.patch("/api/todos/complete/1000/")
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    # TEST DELETE /delete/

    def test_delete_todo(self):
        response = self.client.delete("/api/todos/delete/1/")
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_delete_fails_with_invalid_id(self):
        response = self.client.delete("/api/todos/delete/1000/")
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
