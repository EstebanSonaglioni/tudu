# 🚀 tudú | Full-Stack Task Manager

**tudú** es una aplicación de gestión de tareas diseñada con un enfoque en la robustez técnica y la experiencia de usuario. El proyecto implementa una arquitectura desacoplada, utilizando **Django** como motor de API y **React** para una interfaz moderna, todo orquestado bajo **Docker**.

## 🏗️ Arquitectura del Proyecto

Este proyecto destaca por una clara separación de responsabilidades:

- **Backend (API Rest):** Construido con Python y Django, utiliza **JWT (JSON Web Tokens)** para una autenticación segura y escalable.
- **Frontend (SPA):** Desarrollado con React + Vite. La lógica de negocio está encapsulada en **Custom Hooks**, permitiendo que los componentes se centren exclusivamente en la representación visual.
- **Estilos:** Diseño responsivo y moderno utilizando **Tailwind CSS**.
- **Navegación:** Gestión de rutas fluida con **React Router DOM**.

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Backend** | Python 3.12, Django, Django Rest Framework, SimpleJWT |
| **Frontend** | React, Vite, Tailwind CSS, React Router DOM |
| **Infraestructura** | Docker, Docker Compose, Nginx (para serving estático) |
| **Base de Datos** | SQLite (con persistencia mediante volúmenes de Docker) |

## ✨ Características Técnicas

- **Autenticación Protegida:** Flujo completo de Login/Registro validado mediante tokens JWT en cada solicitud al backend.
- **Lógica Desacoplada:** Uso intensivo de Custom Hooks en React para manejar llamadas a la API y estado local, facilitando el testing y mantenimiento.
- **Infraestructura como Código:** Despliegue inmediato mediante Docker Compose, configurando redes internas para la comunicación entre servicios.
- **Producción Ready:** Dockerfile del frontend configurado con *multi-stage build* y Nginx para optimizar el rendimiento.

## 📦 Instalación y Ejecución

Solo necesitas tener instalado **Docker** y el plugin de **Compose**.

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com:EstebanSonaglioni/tudu.git](github.com:EstebanSonaglioni/tudu.git)
   cd tudu