# Todo API

![Python](https://img.shields.io/badge/python-3.14-blue)
![Django](https://img.shields.io/badge/django-6.0.3-green)
![DRF](https://img.shields.io/badge/django--rest--framework-api-red)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Tests](https://img.shields.io/badge/tests-covered-brightgreen)

API REST simple para gestionar tareas personales (To-Do).

Construida con Django y Django REST Framework.

---

# Características

- Registro de usuarios
- Autenticación con token
- Crear tareas
- Listar tareas
- Marcar tareas como completadas
- Filtrar tareas por título
- Filtrar tareas por fecha de creación
- Middleware de logging
- Tests unitarios e integración
- Containerización con Docker

---

# Stack Tecnológico

- Python 3.14
- Django
- Django REST Framework
- Docker
- SQLite
- Bruno (testing de API)

---

# Arquitectura

El proyecto sigue una arquitectura por capas.


Views (endpoints de la API) ->
Services (lógica de negocio) ->
Models (base de datos)


Beneficios:

- separación clara de responsabilidades
- código más fácil de testear
- lógica reutilizable


---

# Instalación

## 1. Clonar el repositorio


git clone https://github.com/EstebanSonaglioni/invera-todo-challenge.git

cd invera-todo-challenge


---

## 2. Crear entorno virtual

```bash
python -m venv .venv
```

Activar entorno

Linux / Mac

```bash
source venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

---

## 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

---

## 4. Ejecutar migraciones

```bash
python manage.py migrate
```

---

## 5. Ejecutar servidor

```bash
python manage.py runserver
```

La API estará disponible en:

```bash
http://127.0.0.1:8000
```

---

# Ejecutar con Docker

Construir la imagen

```bash
docker build -t invera-todo-challenge .
```

Ejecutar el contenedor

```bash
docker run -p 8000:8000 invera-todo-challenge
```

---

# Autenticación

La API utiliza **Token Authentication**.

Agregar el siguiente header en las requests:


Authorization: Bearer TU_TOKEN


---

# Endpoints de la API

| Método | Endpoint | Descripción |
|------|------|------|
| POST | `/api/users/register` | Registrar usuario |
| POST | `/api/users/login` | Obtener token |
| GET | `/api/todos/get/` | Listar tareas |
| POST | `/api/todos/create/` | Crear tarea |
| PATCH | `/api/todos/complete/{id}/` | Marcar tarea como completada |
| DELETE | `/api/todos/delete/{id}/` | Borrar tarea |

---

# SWAGGER

Se puede acceder al swagger de la API con la dirección http://127.0.0.1:8000/swagger/ una vez iniciado el programa.

---

# Logging

La aplicación incluye un middleware personalizado que registra todas las requests.

Ejemplo de log:


INFO api method=GET path=/api/todos/ user=1 status=200 duration_ms=12


Información registrada:

- método HTTP
- endpoint
- usuario autenticado
- código de respuesta
- duración de la request

---

# Ejecutar Tests

Para ejecutar todos los tests:

```bash
python manage.py test 
```

Los tests cubren:

- modelos
- serializers
- capa de servicios
- endpoints de la API


# Autor

Esteban Sonaglioni