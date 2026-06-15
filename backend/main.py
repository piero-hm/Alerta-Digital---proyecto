from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from src.models.pregunta_quiz import PreguntaQuiz
from src.models.intento_quiz import IntentoQuiz
from src.models.respuesta_intento import RespuestaIntento
from src.routers import auth, reportes, quiz, stats

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Ciberseguro Huancayo API",
    description="API backend para la aplicación de ciberseguridad orientada a adultos mayores",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(auth.router)
app.include_router(reportes.router)
app.include_router(quiz.router)
app.include_router(stats.router)


@app.get("/")
def root():
    return {"status": "ok", "app": "Ciberseguro Huancayo API"}
