# Alerta Digital

Sistema de alertas y monitoreo en tiempo real desarrollado con **Angular 21**. Una aplicación frontend moderna y responsive para gestionar y visualizar alertas de forma eficiente.

---

##  Información del Proyecto

- **Nombre:** Alerta Digital
- **Versión:** 0.0.0
- **Estado:** En desarrollo
- **Licencia:** -
- **Repositorio:** [piero-hm/Alerta-Digital---proyecto](https://github.com/piero-hm/Alerta-Digital---proyecto)

---


##  Requisitos

- **Node.js:** v18+ 
- **npm:** 10.9.4+
- **Angular CLI:** 21.2.9

---

##  Instalación y Setup

### 1. Clonar el repositorio
```bash
git clone https://github.com/piero-hm/Alerta-Digital---proyecto.git
cd Alerta-Digital---proyecto
```

<<<<<<< HEAD
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
=======
### 2. Instalar dependencias
```bash
npm install
```

Este comando instalará automáticamente todas las dependencias necesarias:
- Angular Core & Modules
- RxJS
- TypeScript
- Vitest
- Prettier

---

## Comandos Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm start
# o
ng serve
```
Abre tu navegador en `http://localhost:4200/`

### Build
```bash
# Compilar para producción
npm run build
```
Los archivos compilados se guardarán en `dist/`




##  Estructura del Proyecto

```
Alerta-Digital---proyecto/
├── src/
│   ├── app/              # Componentes y lógica de la aplicación
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── styles/           # Estilos globales
│   └── main.ts           # Punto de entrada
├── dist/                 # Build de producción (generado)
├── package.json          # Dependencias del proyecto
├── angular.json          # Configuración de Angular CLI
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Este archivo
```

### Más información
Para más comandos disponibles, consulta:
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Guide](https://angular.dev)

---

## 🧪 Testing

Proyecto configurado con **Vitest** para pruebas unitarias:

```bash
npm test
>>>>>>> 3b73859 (Velita Lozano Anyelo)
```

---

<<<<<<< HEAD
Desarrollado como proyecto de investigación para la prevención de ciberdelitos en adultos mayores — Región Junín, Perú.
=======
## 📝 Dependencias Principales

### Dependencias de Producción
- `@angular/common` - Módulos comunes de Angular
- `@angular/core` - Core de Angular
- `@angular/forms` - Manejo de formularios
- `@angular/platform-browser` - Plataforma del navegador
- `@angular/router` - Enrutamiento
- `rxjs` - Programación reactiva

### Dependencias de Desarrollo
- `@angular/cli` - CLI de Angular
- `@angular/build` - Build de Angular
- `typescript` - Lenguaje TypeScript
- `vitest` - Framework de testing
- `prettier` - Formateador de código

---

## 📄 Licencia

Este proyecto actualmente no cuenta con una licencia especificada.

---

## 👤 Autor

**piero-hm** - [GitHub Profile](https://github.com/piero-hm)

---

## 📞 Soporte

Si encuentras problemas o tienes sugerencias:
- Abre un [Issue](https://github.com/piero-hm/Alerta-Digital---proyecto/issues)
- Envía un [Pull Request](https://github.com/piero-hm/Alerta-Digital---proyecto/pulls)

---


**Última actualización:** Junio 2026
>>>>>>> 3b73859 (Velita Lozano Anyelo)
