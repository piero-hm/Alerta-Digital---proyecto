from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from src.models.reporte import Reporte
from src.models.usuario import Usuario
from src.schemas.reporte import ReporteCrear, ReporteActualizar, ReporteRespuesta


def crear_reporte(data: ReporteCrear, usuario: Usuario, db: Session) -> ReporteRespuesta:
    reporte = Reporte(
        usuario_id=usuario.id,
        tipo_fraude=data.tipo_fraude,
        descripcion=data.descripcion,
        medio=data.medio,
        monto_afectado=data.monto_afectado,
    )
    db.add(reporte)
    db.commit()
    db.refresh(reporte)
    return ReporteRespuesta.model_validate(reporte)


def listar_reportes_usuario(usuario: Usuario, db: Session) -> list[ReporteRespuesta]:
    reportes = (
        db.query(Reporte)
        .filter(Reporte.usuario_id == usuario.id)
        .order_by(Reporte.creado_en.desc())
        .all()
    )
    return [ReporteRespuesta.model_validate(r) for r in reportes]


def obtener_reporte_por_id(
    reporte_id: int, usuario: Usuario, db: Session
) -> ReporteRespuesta:
    reporte = db.query(Reporte).filter(Reporte.id == reporte_id).first()
    if reporte is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reporte no encontrado",
        )
    if reporte.usuario_id != usuario.id and not usuario.es_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para ver este reporte",
        )
    return ReporteRespuesta.model_validate(reporte)


def listar_todos_reportes(db: Session) -> list[ReporteRespuesta]:
    reportes = db.query(Reporte).order_by(Reporte.creado_en.desc()).all()
    return [ReporteRespuesta.model_validate(r) for r in reportes]


def actualizar_estado_reporte(
    reporte_id: int, data: ReporteActualizar, db: Session
) -> ReporteRespuesta:
    reporte = db.query(Reporte).filter(Reporte.id == reporte_id).first()
    if reporte is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reporte no encontrado",
        )
    if data.estado not in ("pendiente", "revisado", "resuelto"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Estado inválido. Use: pendiente, revisado o resuelto",
        )
    reporte.estado = data.estado
    db.commit()
    db.refresh(reporte)
    return ReporteRespuesta.model_validate(reporte)


def eliminar_reporte(reporte_id: int, db: Session) -> None:
    reporte = db.query(Reporte).filter(Reporte.id == reporte_id).first()
    if reporte is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reporte no encontrado",
        )
    db.delete(reporte)
    db.commit()
