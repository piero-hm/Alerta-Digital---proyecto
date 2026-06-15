from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class QuizResultadoCrear(BaseModel):
    puntaje: int
    total_preguntas: int


class QuizResultadoRespuesta(BaseModel):
    id: int
    usuario_id: int
    puntaje: int
    total_preguntas: int
    porcentaje: Optional[Decimal] = None
    nivel: Optional[str] = None
    creado_en: datetime

    model_config = {"from_attributes": True}


class QuizEstadisticas(BaseModel):
    total_intentos: int
    promedio_porcentaje: Optional[Decimal] = None
    mejor_porcentaje: Optional[Decimal] = None
    mejor_nivel: Optional[str] = None
    ultimo_resultado: Optional[QuizResultadoRespuesta] = None


class PreguntaOut(BaseModel):
    id: int
    tipo: str
    categoria: str
    situacion: str
    mensaje_simulado: Optional[str] = None
    opciones: list[str]
    respuesta_correcta: int
    explicacion: str
    consejo: Optional[str] = None

    model_config = {"from_attributes": True}


class IniciarQuizRespuesta(BaseModel):
    intento_id: int
    preguntas: list[PreguntaOut]


class ResponderInput(BaseModel):
    pregunta_id: int
    opcion_elegida: int


class ResponderRespuesta(BaseModel):
    es_correcta: bool
    respuesta_correcta: int
    explicacion: str
    consejo: Optional[str] = None
    pregunta_actual: int
    total_preguntas: int
    puntaje_actual: int


class RespuestaDetalle(BaseModel):
    pregunta_id: int
    situacion: str
    tipo: str
    categoria: str
    opcion_elegida: int
    respuesta_correcta: int
    es_correcta: bool
    explicacion: str
    consejo: Optional[str] = None
    opciones: list[str]

    model_config = {"from_attributes": True}


class IntentoDetalle(BaseModel):
    id: int
    puntaje: int
    total_preguntas: int
    porcentaje: Optional[Decimal] = None
    nivel: Optional[str] = None
    completado: bool
    pregunta_actual: int
    creado_en: datetime
    terminado_en: Optional[datetime] = None
    respuestas: list[RespuestaDetalle]
    preguntas: list[PreguntaOut] = []

    model_config = {"from_attributes": True}


class IntentoListaItem(BaseModel):
    id: int
    puntaje: int
    total_preguntas: int
    porcentaje: Optional[Decimal] = None
    nivel: Optional[str] = None
    completado: bool
    creado_en: datetime

    model_config = {"from_attributes": True}
