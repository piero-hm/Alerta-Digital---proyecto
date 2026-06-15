from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class ReporteCrear(BaseModel):
    tipo_fraude: str
    descripcion: str
    medio: Optional[str] = None
    monto_afectado: Optional[Decimal] = None


class ReporteActualizar(BaseModel):
    estado: str


class ReporteRespuesta(BaseModel):
    id: int
    usuario_id: int
    tipo_fraude: str
    descripcion: str
    medio: Optional[str] = None
    monto_afectado: Optional[Decimal] = None
    estado: str
    creado_en: datetime

    model_config = {"from_attributes": True}
