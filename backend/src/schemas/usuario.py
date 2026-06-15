from datetime import datetime
from pydantic import BaseModel, EmailStr


class UsuarioCrear(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    password: str


class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str


class UsuarioRespuesta(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: str
    es_admin: bool
    creado_en: datetime

    model_config = {"from_attributes": True}


class TokenRespuesta(BaseModel):
    access_token: str
    token_type: str
    usuario: UsuarioRespuesta
