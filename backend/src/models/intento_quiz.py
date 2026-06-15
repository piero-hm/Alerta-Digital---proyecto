from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Numeric, func
from sqlalchemy.orm import relationship
from database import Base


class IntentoQuiz(Base):
    __tablename__ = "intentos_quiz"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    puntaje = Column(Integer, default=0)
    total_preguntas = Column(Integer, default=0)
    porcentaje = Column(Numeric(5, 2), nullable=True)
    nivel = Column(String(50), nullable=True)
    pregunta_actual = Column(Integer, default=0)
    completado = Column(Boolean, default=False)
    creado_en = Column(DateTime, default=func.now())
    terminado_en = Column(DateTime, nullable=True)

    usuario = relationship("Usuario", backref="intentos_quiz")
    respuestas = relationship("RespuestaIntento", backref="intento", cascade="all, delete-orphan")
