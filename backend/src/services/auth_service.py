from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
import bcrypt
from sqlalchemy.orm import Session

from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS
from database import get_db
from src.models.usuario import Usuario
from src.schemas.usuario import UsuarioCrear, UsuarioLogin, UsuarioRespuesta, TokenRespuesta

security = HTTPBearer()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verificar_password(password_plano: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password_plano.encode("utf-8"), password_hash.encode("utf-8"))


def crear_token(usuario: Usuario) -> str:
    payload = {
        "sub": usuario.email,
        "id": usuario.id,
        "es_admin": usuario.es_admin,
        "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def registrar_usuario(data: UsuarioCrear, db: Session) -> UsuarioRespuesta:
    existente = db.query(Usuario).filter(Usuario.email == data.email).first()
    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado",
        )

    usuario = Usuario(
        nombre=data.nombre,
        apellido=data.apellido,
        email=data.email,
        password=hash_password(data.password),
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return UsuarioRespuesta.model_validate(usuario)


def iniciar_sesion(data: UsuarioLogin, db: Session) -> TokenRespuesta:
    usuario = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not usuario or not verificar_password(data.password, usuario.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )
    if not usuario.activo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cuenta desactivada",
        )

    token = crear_token(usuario)
    usuario_resp = UsuarioRespuesta.model_validate(usuario)
    return TokenRespuesta(access_token=token, token_type="bearer", usuario=usuario_resp)


def obtener_usuario_actual(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> Usuario:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        usuario_id: int = payload.get("id")
        if usuario_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
        )

    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if usuario is None or not usuario.activo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado o desactivado",
        )
    return usuario


def obtener_admin_actual(
    usuario: Usuario = Depends(obtener_usuario_actual),
) -> Usuario:
    if not usuario.es_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos de administrador",
        )
    return usuario


def obtener_datos_usuario(usuario: Usuario) -> UsuarioRespuesta:
    return UsuarioRespuesta.model_validate(usuario)
