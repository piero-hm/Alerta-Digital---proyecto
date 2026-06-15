from decimal import Decimal, ROUND_HALF_UP
from fastapi import APIRouter, Depends
from sqlalchemy import func as sqlfunc
from sqlalchemy.orm import Session

from database import get_db
from src.models.usuario import Usuario
from src.models.reporte import Reporte
from src.models.quiz_resultado import QuizResultado
from src.services.auth_service import obtener_usuario_actual

router = APIRouter(prefix="/api/stats", tags=["Estadísticas"])


@router.get("/resumen")
def resumen(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    """
    Devuelve estadísticas del dashboard para el usuario autenticado.
    """
    total_reportes = (
        db.query(sqlfunc.count(Reporte.id))
        .filter(Reporte.usuario_id == usuario.id)
        .scalar()
        or 0
    )

    reportes_por_estado = (
        db.query(Reporte.estado, sqlfunc.count(Reporte.id))
        .filter(Reporte.usuario_id == usuario.id)
        .group_by(Reporte.estado)
        .all()
    )

    quiz_stats = (
        db.query(
            sqlfunc.avg(QuizResultado.porcentaje),
            sqlfunc.max(QuizResultado.porcentaje),
            sqlfunc.count(QuizResultado.id),
        )
        .filter(QuizResultado.usuario_id == usuario.id)
        .first()
    )

    promedio_quiz = (
        Decimal(str(quiz_stats[0])).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        if quiz_stats[0] is not None
        else 0
    )
    mejor_puntaje = (
        Decimal(str(quiz_stats[1])).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        if quiz_stats[1] is not None
        else 0
    )
    total_intentos_quiz = quiz_stats[2] or 0

    ultimo_resultado = (
        db.query(QuizResultado)
        .filter(QuizResultado.usuario_id == usuario.id)
        .order_by(QuizResultado.creado_en.desc())
        .first()
    )

    tipos_fraude = (
        db.query(Reporte.tipo_fraude, sqlfunc.count(Reporte.id))
        .filter(Reporte.usuario_id == usuario.id)
        .group_by(Reporte.tipo_fraude)
        .all()
    )

    return {
        "total_reportes": total_reportes,
        "reportes_por_estado": {estado: count for estado, count in reportes_por_estado},
        "promedio_quiz": float(promedio_quiz),
        "mejor_puntaje_quiz": float(mejor_puntaje),
        "total_intentos_quiz": total_intentos_quiz,
        "ultimo_resultado_quiz": (
            {
                "puntaje": ultimo_resultado.puntaje,
                "total_preguntas": ultimo_resultado.total_preguntas,
                "porcentaje": float(ultimo_resultado.porcentaje),
                "nivel": ultimo_resultado.nivel,
            }
            if ultimo_resultado
            else None
        ),
        "tipos_fraude": {tipo: count for tipo, count in tipos_fraude},
    }
