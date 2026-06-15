from sqlalchemy import Column, Integer, String, Text, Boolean
from database import Base


class PreguntaQuiz(Base):
    __tablename__ = "preguntas_quiz"

    id = Column(Integer, primary_key=True, autoincrement=True)
    tipo = Column(String(100), nullable=False)
    categoria = Column(String(100), nullable=False)
    situacion = Column(Text, nullable=False)
    mensaje_simulado = Column(Text, nullable=True)
    opciones = Column(Text, nullable=False)
    respuesta_correcta = Column(Integer, nullable=False)
    explicacion = Column(Text, nullable=False)
    consejo = Column(Text, nullable=True)
    activa = Column(Boolean, default=True)
