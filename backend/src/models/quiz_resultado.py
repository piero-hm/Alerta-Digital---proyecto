from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, func
from sqlalchemy.orm import relationship

from database import Base


class QuizResultado(Base):
    __tablename__ = "quiz_resultados"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    puntaje = Column(Integer, nullable=False)
    total_preguntas = Column(Integer, nullable=False)
    porcentaje = Column(Numeric(5, 2), nullable=True)
    nivel = Column(String(50), nullable=True)
    creado_en = Column(DateTime, default=func.now())

    usuario = relationship("Usuario", backref="quiz_resultados")
