# Alerta Digital — Ciberseguro Huancayo

Plataforma de protección digital para adultos mayores en la región Junín, Perú.  
Sistema de capacitación en ciberseguridad con módulos educativos, quizzes interactivos y registro de incidentes de fraude.

---

## 🧠 Tecnologías

| Capa | Tecnología |
|---|---|
| **Frontend** | Angular 21 (standalone components) |
| **Backend** | Python 3.12 + FastAPI |
| **Base de datos** | MySQL |
| **ORM** | SQLAlchemy 2.0 |
| **Autenticación** | JWT (python-jose + bcrypt) |

---

## 📋 Prerrequisitos

- **Node.js** v18 o superior
- **Python** 3.12 o superior
- **MySQL** funcionando
- **npm** (viene con Node.js)
- **pip** (viene con Python)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/piero-hm/Alerta-Digital---proyecto.git
cd Alerta-Digital---proyecto
```

### 2. Configurar el Backend

```bash
cd backend
python -m venv .venv

# Activar entorno virtual
# Linux / Mac:
source .venv/bin/activate
# Windows:
# .venv\Scripts\activate

pip install -r requirements.txt
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar el archivo `.env` con los datos de tu base de datos local:

```env
DB_SERVER=localhost
DB_NAME=alerta_digital
DB_USER=root
DB_PASSWORD=tu_contraseña
SECRET_KEY=una_clave_secreta_segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_HOURS=24
```

### 4. Crear la base de datos

```sql
CREATE DATABASE alerta_digital;
```

### 5. Iniciar el Backend

```bash
uvicorn src.main:app --reload --port 8000
```

El servidor se ejecutará en `http://localhost:8000`.

### 6. Configurar el Frontend

En otra terminal:

```bash
cd frontend
npm install
```

### 7. Iniciar el Frontend

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

---

## 📁 Estructura del proyecto

```
Alerta-Digital---proyecto/
├── backend/
│   ├── src/
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── routers/        # Endpoints FastAPI
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Lógica de negocio
│   ├── config.py           # Configuración de BD y JWT
│   ├── database.py         # Conexión SQLAlchemy
│   ├── main.py             # Punto de entrada FastAPI
│   ├── requirements.txt
│   ├── pyproject.toml
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Guards, interceptors, servicios
│   │   │   ├── shared/     # Navbar, Footer
│   │   │   └── features/   # Módulos (dashboard, auth, educacion, quiz, reportes)
│   │   ├── assets/         # Imágenes, recursos estáticos
│   │   └── environments/   # Configuración por entorno
│   ├── angular.json
│   └── package.json
└── .gitignore
```

---

## ✨ Funcionalidades

- **Dashboard** — Resumen de actividad del usuario, estadísticas de reportes y progreso en quizzes
- **Educación** — Módulos de capacitación en prevención de phishing, contraseñas seguras y fraudes telefónicos
- **Quiz interactivo** — Evaluación de conocimientos con preguntas de opción múltiple y niveles de dificultad
- **Reportes de incidentes** — Registro de intentos de estafa o fraude con seguimiento de estado
- **Autenticación segura** — Registro e inicio de sesión con JWT

---

## ⚙️ Comandos útiles

```bash
# Backend — recargar automáticamente al editar
uvicorn src.main:app --reload --port 8000

# Frontend — servidor de desarrollo
ng serve

# Frontend — construcción para producción
ng build
```

---

Desarrollado como proyecto de investigación para la prevención de ciberdelitos en adultos mayores — Región Junín, Perú.
