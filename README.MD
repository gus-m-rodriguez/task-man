# 🕹️ Task-Man — UTN WIZARDS 2025

> "El código es conocimiento compartido; lo que aprendemos, lo construimos juntos."

---

## 📘 Descripción del proyecto

**Task-Man** es una aplicación web full stack desarrollada como parte del proyecto integrador de la **Tecnicatura Universitaria en Programación** de la **UTN**. Permite gestionar tareas personales de forma sencilla y segura, implementando autenticación con JWT, manejo de sesiones, validaciones, y un diseño moderno orientado a la experiencia de usuario.

👨‍💻 **Equipo UTN WIZARDS**:
Victor Alejandro · Florencia · Axel · Franco · Rocío · Alejandro · Gustavo · Brisa

---

## ⚙️ Funcionalidades principales

* **Registro e inicio de sesión** con validación de datos y JWT.
* **Gestor de perfil de usuario**:

  * Visualización de datos.
  * Actualización de nombre o email.
  * Cambio de contraseña con validación segura.
  * Integración de avatar mediante Gravatar o iniciales automáticas.

* **Gestor de tareas**:

  * Alta, edición y eliminación de tareas.
  * Estado de finalización.
  * Visualización filtrada por usuario autenticado.

---

## 🗂️ Estructura de carpetas

```bash
📦 backend/
 ┣ 📂 controllers/
 ┣ 📂 middlewares/
 ┣ 📂 routes/
 ┣ 📜 app.js
 ┣ 📜 db.js
 ┣ 📜 config.js
 ┣ 📜 server.js

📦 frontend/
 ┣ 📂 src/
 ┃ ┣ 📂 api/
 ┃ ┣ 📂 components/
 ┃ ┣ 📂 context/
 ┃ ┣ 📂 pages/
 ┃ ┗ 📂 ui/
 ┣ 📜 main.jsx
 ┣ 📜 package.json
 ┗ 📜 vite.config.js
```

---

## 🧠 Ejecución local

### 📋 Requisitos previos

* Node.js v18 o superior
* PostgreSQL instalado y corriendo
* npm o yarn

### ⚙️ Configuración del backend

1. Crear base de datos:

```sql
CREATE DATABASE pern;
```

2. Crear tabla de usuarios (simplificada):

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP DEFAULT NOW(),
  gravatar TEXT
);
```

3. Configurar variables en `.env` o en `config.js`:

```bash
PG_USER=postgres
PG_PASSWORD=admin
PG_HOST=localhost
PG_PORT=5432
ORIGIN=http://localhost:5173
```

4. Instalar dependencias y ejecutar:

```bash
cd backend
npm install
npm run dev
```

### 🖥️ Frontend

1. En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

2. Abrir en navegador:

👉 [http://localhost:5173](http://localhost:5173)

---

## 🌟 Funcionalidades destacadas del perfil

| Acción                  | Endpoint                | Método | Descripción                            |
| :---------------------- | :---------------------- | :----: | :------------------------------------- |
| Obtener perfil          | `/api/profile`          |   GET  | Devuelve datos del usuario autenticado |
| Actualizar nombre/email | `/api/profile`          |   PUT  | Valida duplicados y formato            |
| Cambiar contraseña      | `/api/profile/password` |   PUT  | Requiere contraseña actual válida      |
| Cerrar sesión           | `/api/signout`          |  POST  | Elimina cookie JWT                     |

---

## 🤝 Contribución

Este proyecto fue desarrollado de forma colaborativa siguiendo buenas prácticas de control de versiones, estilo de código y validaciones básicas.

Cada integrante participó en tareas específicas de backend, frontend o diseño, con enfoque en aprendizaje práctico.

---

## 🪪 Licencia

Este proyecto fue realizado con fines educativos y puede ser utilizado o adaptado libremente citando a sus autores y a la UTN como institución formadora.

---

## ✨ UTN WIZARDS — 2025

> *El código es conocimiento compartido; lo que aprendemos, lo construimos juntos.*
