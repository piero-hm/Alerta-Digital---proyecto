from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Numeric, func
from sqlalchemy.orm import relationship

from database import Base


class Reporte(Base):
    __tablename__ = "reportes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    tipo_fraude = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=False)
    medio = Column(String(100), nullable=True)
    monto_afectado = Column(Numeric(10, 2), nullable=True)
    estado = Column(String(50), default="pendiente")
    creado_en = Column(DateTime, default=func.now())

    usuario = relationship("Usuario", backref="reportes")
