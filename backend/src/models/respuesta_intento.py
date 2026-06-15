from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from database import Base


class RespuestaIntento(Base):
    __tablename__ = "respuestas_intento"

    id = Column(Integer, primary_key=True, autoincrement=True)
    intento_id = Column(Integer, ForeignKey("intentos_quiz.id"), nullable=False)
    pregunta_id = Column(Integer, ForeignKey("preguntas_quiz.id"), nullable=False)
    opcion_elegida = Column(Integer, nullable=False)
    es_correcta = Column(Boolean, nullable=False)
    creado_en = Column(DateTime, default=func.now())

    pregunta = relationship("PreguntaQuiz")
