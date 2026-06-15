from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
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
)
from src.services.auth_service import obtener_usuario_actual
from src.services.quiz_service import (
    finalizar_quiz,
    guardar_resultado,
    iniciar_quiz,
    obtener_detalle_intento,
    obtener_estadisticas,
    obtener_historial,
    obtener_intentos,
    obtener_preguntas,
    responder_pregunta,
)

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])


@router.get("/preguntas", response_model=list[PreguntaOut])
def get_preguntas(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return obtener_preguntas(db)


@router.post("/iniciar", response_model=IniciarQuizRespuesta)
def post_iniciar(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return iniciar_quiz(usuario, db)


@router.post("/responder/{intento_id}", response_model=ResponderRespuesta)
def post_responder(
    intento_id: int,
    data: ResponderInput,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return responder_pregunta(intento_id, data, usuario, db)


@router.post("/finalizar/{intento_id}", response_model=QuizResultadoRespuesta)
def post_finalizar(
    intento_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return finalizar_quiz(intento_id, usuario, db)


@router.get("/intentos", response_model=list[IntentoListaItem])
def get_intentos(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return obtener_intentos(usuario, db)


@router.get("/intentos/{intento_id}", response_model=IntentoDetalle)
def get_intento_detalle(
    intento_id: int,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return obtener_detalle_intento(intento_id, usuario, db)


@router.post("/resultado", response_model=QuizResultadoRespuesta)
def guardar(
    data: QuizResultadoCrear,
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return guardar_resultado(data, usuario, db)


@router.get("/historial", response_model=list[QuizResultadoRespuesta])
def historial(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return obtener_historial(usuario, db)


@router.get("/estadisticas", response_model=QuizEstadisticas)
def estadisticas(
    usuario: Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db),
):
    return obtener_estadisticas(usuario, db)
