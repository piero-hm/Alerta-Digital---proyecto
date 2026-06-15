from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from src.models.usuario import Usuario
from src.schemas.reporte import ReporteCrear, ReporteActualizar, ReporteRespuesta
from src.services.auth_service import obtener_usuario_actual, obtener_admin_actual
from src.services.reporte_service import (
    crear_reporte,
    listar_reportes_usuario,
    obtener_reporte_por_id,
    listar_todos_reportes,
    actualizar_estado_reporte,
    eliminar_reporte,
)

router = APIRouter(prefix="/api/reportes", tags=["Reportes"])


@router.post("", response_model=ReporteRespuesta)
def crear(
    data: ReporteCrear,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    """
    Crea un nuevo reporte de fraude.
    """
    return crear_reporte(data, usuario, db)


@router.get("", response_model=list[ReporteRespuesta])
def listar_mis_reportes(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    """
    Lista los reportes del usuario autenticado.
    """
    return listar_reportes_usuario(usuario, db)


@router.get("/todos", response_model=list[ReporteRespuesta])
def listar_todos(
    admin: Usuario = Depends(obtener_admin_actual),
    db: Session = Depends(get_db),
):
    """
    Lista todos los reportes (solo admin).
    """
    return listar_todos_reportes(db)


@router.get("/{reporte_id}", response_model=ReporteRespuesta)
def obtener(
    reporte_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    """
    Obtiene un reporte por su ID.
    """
    return obtener_reporte_por_id(reporte_id, usuario, db)


@router.put("/{reporte_id}", response_model=ReporteRespuesta)
def actualizar(
    reporte_id: int,
    data: ReporteActualizar,
    admin: Usuario = Depends(obtener_admin_actual),
    db: Session = Depends(get_db),
):
    """
    Actualiza el estado de un reporte (solo admin).
    """
    return actualizar_estado_reporte(reporte_id, data, db)


@router.delete("/{reporte_id}")
def eliminar(
    reporte_id: int,
    admin: Usuario = Depends(obtener_admin_actual),
    db: Session = Depends(get_db),
):
    """
    Elimina un reporte (solo admin).
    """
    eliminar_reporte(reporte_id, db)
    return {"mensaje": "Reporte eliminado correctamente"}
