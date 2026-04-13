from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.users.serializers import UserSerializer, UserCreateSerializer

User = get_user_model()


class TestUserSerializers(TestCase):

    def test_user_serializer_create(self):

        data = {
            "username": "testuser",
            "password": "AltaPassword1234"
        }

        serializer = UserSerializer(data=data)

        self.assertTrue(serializer.is_valid())

        user = serializer.save()

        self.assertEqual(user.username, "testuser")
        self.assertTrue(user.check_password("AltaPassword1234"))

    def test_password_write_only(self):

        user = User.objects.create_user(
            username="test",
            password="1234"
        )

        serializer = UserSerializer(user)

        self.assertNotIn("password", serializer.data)

    def test_user_serializer_requires_fields(self):

        serializer = UserSerializer(data={})

        self.assertFalse(serializer.is_valid())
        self.assertIn("username", serializer.errors)
        self.assertIn("password", serializer.errors)

    def test_user_create_serializer(self):

        data = {
            "username": "otrouser",
            "password": "Probando!102"
        }

        serializer = UserCreateSerializer(data=data)

        self.assertTrue(serializer.is_valid())

        user = serializer.save()

        self.assertEqual(user.username, "otrouser")
        self.assertTrue(user.check_password("Probando!102"))

    def test_user_create_password_write_only(self):

        user = User.objects.create_user(
            username="test2",
            password="1234"
        )

        serializer = UserCreateSerializer(user)

        self.assertNotIn("password", serializer.data)

    def test_password_is_hashed(self):

        data = {
            "username": "hashuser",
            "password": "Hashedpassword!10"
        }

        serializer = UserCreateSerializer(data=data)
        serializer.is_valid()

        user = serializer.save()

        self.assertNotEqual(user.password, "Hashedpassword!10")