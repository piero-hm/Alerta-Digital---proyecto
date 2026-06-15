import json
from datetime import datetime
from decimal import Decimal, ROUND_HALF_UP
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy import func as sqlfunc
from sqlalchemy.orm import Session

from src.models.intento_quiz import IntentoQuiz
from src.models.pregunta_quiz import PreguntaQuiz
from src.models.quiz_resultado import QuizResultado
from src.models.respuesta_intento import RespuestaIntento
from src.models.usuario import Usuario
from src.schemas.quiz_resultado import (
    IniciarQuizRespuesta,
    IntentoDetalle,
    IntentoListaItem,
    PreguntaOut,
    QuizEstadisticas,
    QuizResultadoCrear,
    QuizResultadoRespuesta,
    ResponderInput,
    ResponderRespuesta,
    RespuestaDetalle,
)


def _calcular_nivel(porcentaje: Decimal) -> str:
    if porcentaje <= 40:
        return "Principiante"
    elif porcentaje <= 70:
        return "Intermedio"
    else:
        return "Avanzado"


def _pregunta_to_out(p: PreguntaQuiz) -> PreguntaOut:
    opciones = json.loads(p.opciones) if isinstance(p.opciones, str) else p.opciones
    return PreguntaOut(
        id=p.id,
        tipo=p.tipo,
        categoria=p.categoria,
        situacion=p.situacion,
        mensaje_simulado=p.mensaje_simulado,
        opciones=opciones,
        respuesta_correcta=p.respuesta_correcta,
        explicacion=p.explicacion,
        consejo=p.consejo,
    )


def obtener_preguntas(db: Session) -> list[PreguntaOut]:
    preguntas = db.query(PreguntaQuiz).filter(PreguntaQuiz.activa == True).all()
    return [_pregunta_to_out(p) for p in preguntas]


def iniciar_quiz(usuario: Usuario, db: Session) -> IniciarQuizRespuesta:
    preguntas = db.query(PreguntaQuiz).filter(PreguntaQuiz.activa == True).all()
    if not preguntas:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay preguntas disponibles",
        )

    intento = IntentoQuiz(
        usuario_id=usuario.id,
        total_preguntas=len(preguntas),
        pregunta_actual=0,
        completado=False,
    )
    db.add(intento)
    db.commit()
    db.refresh(intento)

    return IniciarQuizRespuesta(
        intento_id=intento.id,
        preguntas=[_pregunta_to_out(p) for p in preguntas],
    )


def responder_pregunta(
    intento_id: int,
    data: ResponderInput,
    usuario: Usuario,
    db: Session,
) -> ResponderRespuesta:
    intento = (
        db.query(IntentoQuiz)
        .filter(
            IntentoQuiz.id == intento_id,
            IntentoQuiz.usuario_id == usuario.id,
        )
        .first()
    )

    if not intento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Intento no encontrado",
        )
    if intento.completado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este intento ya está completado",
        )

    pregunta = db.query(PreguntaQuiz).filter(PreguntaQuiz.id == data.pregunta_id).first()
    if not pregunta:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pregunta no encontrada",
        )

    es_correcta = data.opcion_elegida == pregunta.respuesta_correcta

    respuesta = RespuestaIntento(
        intento_id=intento.id,
        pregunta_id=data.pregunta_id,
        opcion_elegida=data.opcion_elegida,
        es_correcta=es_correcta,
    )
    db.add(respuesta)

    if es_correcta:
        intento.puntaje += 1

    intento.pregunta_actual += 1

    db.commit()
    db.refresh(respuesta)

    return ResponderRespuesta(
        es_correcta=es_correcta,
        respuesta_correcta=pregunta.respuesta_correcta,
        explicacion=pregunta.explicacion,
        consejo=pregunta.consejo,
        pregunta_actual=intento.pregunta_actual,
        total_preguntas=intento.total_preguntas,
        puntaje_actual=intento.puntaje,
    )


def finalizar_quiz(
    intento_id: int, usuario: Usuario, db: Session
) -> QuizResultadoRespuesta:
    intento = (
        db.query(IntentoQuiz)
        .filter(
            IntentoQuiz.id == intento_id,
            IntentoQuiz.usuario_id == usuario.id,
        )
        .first()
    )

    if not intento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Intento no encontrado",
        )
    if intento.completado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este intento ya fue finalizado",
        )
    if intento.total_preguntas <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sin preguntas en el intento",
        )

    porcentaje = (
        Decimal(str(intento.puntaje))
        / Decimal(str(intento.total_preguntas))
        * 100
    )
    porcentaje = porcentaje.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    nivel = _calcular_nivel(porcentaje)

    intento.porcentaje = porcentaje
    intento.nivel = nivel
    intento.completado = True
    intento.terminado_en = datetime.now()

    resultado = QuizResultado(
        usuario_id=usuario.id,
        puntaje=intento.puntaje,
        total_preguntas=intento.total_preguntas,
        porcentaje=porcentaje,
        nivel=nivel,
    )
    db.add(resultado)
    db.commit()
    db.refresh(resultado)

    return QuizResultadoRespuesta.model_validate(resultado)


def obtener_intentos(
    usuario: Usuario, db: Session
) -> list[IntentoListaItem]:
    intentos = (
        db.query(IntentoQuiz)
        .filter(IntentoQuiz.usuario_id == usuario.id)
        .order_by(IntentoQuiz.creado_en.desc())
        .all()
    )
    return [IntentoListaItem.model_validate(i) for i in intentos]


def obtener_detalle_intento(
    intento_id: int, usuario: Usuario, db: Session
) -> IntentoDetalle:
    intento = (
        db.query(IntentoQuiz)
        .filter(
            IntentoQuiz.id == intento_id,
            IntentoQuiz.usuario_id == usuario.id,
        )
        .first()
    )

    if not intento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Intento no encontrado",
        )

    respuestas_out = []
    for r in intento.respuestas:
        p = r.pregunta
        opciones = json.loads(p.opciones) if isinstance(p.opciones, str) else p.opciones
        respuestas_out.append(
            RespuestaDetalle(
                pregunta_id=p.id,
                situacion=p.situacion,
                tipo=p.tipo,
                categoria=p.categoria,
                opcion_elegida=r.opcion_elegida,
                respuesta_correcta=p.respuesta_correcta,
                es_correcta=r.es_correcta,
                explicacion=p.explicacion,
                consejo=p.consejo,
                opciones=opciones,
            )
        )

    preguntas_out = obtener_preguntas(db)

    return IntentoDetalle(
        id=intento.id,
        puntaje=intento.puntaje,
        total_preguntas=intento.total_preguntas,
        porcentaje=intento.porcentaje,
        nivel=intento.nivel,
        completado=intento.completado,
        pregunta_actual=intento.pregunta_actual,
        creado_en=intento.creado_en,
        terminado_en=intento.terminado_en,
        respuestas=respuestas_out,
        preguntas=preguntas_out,
    )


def guardar_resultado(
    data: QuizResultadoCrear, usuario: Usuario, db: Session
) -> QuizResultadoRespuesta:
    if data.total_preguntas <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El total de preguntas debe ser mayor a cero",
        )
    if data.puntaje < 0 or data.puntaje > data.total_preguntas:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El puntaje debe estar entre 0 y el total de preguntas",
        )

    porcentaje = Decimal(str(data.puntaje)) / Decimal(str(data.total_preguntas)) * 100
    porcentaje = porcentaje.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    nivel = _calcular_nivel(porcentaje)

    resultado = QuizResultado(
        usuario_id=usuario.id,
        puntaje=data.puntaje,
        total_preguntas=data.total_preguntas,
        porcentaje=porcentaje,
        nivel=nivel,
    )
    db.add(resultado)
    db.commit()
    db.refresh(resultado)
    return QuizResultadoRespuesta.model_validate(resultado)


def obtener_historial(
    usuario: Usuario, db: Session
) -> list[QuizResultadoRespuesta]:
    resultados = (
        db.query(QuizResultado)
        .filter(QuizResultado.usuario_id == usuario.id)
        .order_by(QuizResultado.creado_en.desc())
        .all()
    )
    return [QuizResultadoRespuesta.model_validate(r) for r in resultados]


def obtener_estadisticas(usuario: Usuario, db: Session) -> QuizEstadisticas:
    stats = (
        db.query(
            sqlfunc.count(QuizResultado.id),
            sqlfunc.avg(QuizResultado.porcentaje),
            sqlfunc.max(QuizResultado.porcentaje),
        )
        .filter(QuizResultado.usuario_id == usuario.id)
        .first()
    )

    total_intentos = stats[0] or 0
    promedio_porcentaje = (
        Decimal(str(stats[1])).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        if stats[1] is not None
        else None
    )
    mejor_porcentaje = (
        Decimal(str(stats[2])).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        if stats[2] is not None
        else None
    )
    mejor_nivel: Optional[str] = None
    if mejor_porcentaje is not None:
        mejor_nivel = _calcular_nivel(mejor_porcentaje)

    ultimo = (
        db.query(QuizResultado)
        .filter(QuizResultado.usuario_id == usuario.id)
        .order_by(QuizResultado.creado_en.desc())
        .first()
    )
    ultimo_resp = QuizResultadoRespuesta.model_validate(ultimo) if ultimo else None

    return QuizEstadisticas(
        total_intentos=total_intentos,
        promedio_porcentaje=promedio_porcentaje,
        mejor_porcentaje=mejor_porcentaje,
        mejor_nivel=mejor_nivel,
        ultimo_resultado=ultimo_resp,
    )
