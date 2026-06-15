from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from src.schemas.usuario import UsuarioCrear, UsuarioLogin, UsuarioRespuesta, TokenRespuesta
from src.services.auth_service import (
    registrar_usuario,
    iniciar_sesion,
    obtener_usuario_actual,
    obtener_datos_usuario,
)
from src.models.usuario import Usuario

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])


@router.post("/register", response_model=UsuarioRespuesta)
def register(data: UsuarioCrear, db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario en el sistema.
    """
    return registrar_usuario(data, db)


@router.post("/login", response_model=TokenRespuesta)
def login(data: UsuarioLogin, db: Session = Depends(get_db)):
    """
    Inicia sesión y devuelve un token JWT.
    """
    return iniciar_sesion(data, db)


@router.get("/me", response_model=UsuarioRespuesta)
def me(usuario: Usuario = Depends(obtener_usuario_actual)):
    """
    Devuelve los datos del usuario autenticado.
    """
    return obtener_datos_usuario(usuario)
