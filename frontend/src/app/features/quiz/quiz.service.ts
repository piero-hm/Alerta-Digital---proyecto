import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Pregunta {
  id: number;
  tipo: string;
  categoria: string;
  situacion: string;
  mensaje_simulado?: string;
  opciones: string[];
  respuesta_correcta: number;
  explicacion: string;
  consejo?: string;
}

export interface IniciarQuizRespuesta {
  intento_id: number;
  preguntas: Pregunta[];
}

export interface ResponderRespuesta {
  es_correcta: boolean;
  respuesta_correcta: number;
  explicacion: string;
  consejo?: string;
  pregunta_actual: number;
  total_preguntas: number;
  puntaje_actual: number;
}

export interface QuizResultadoRespuesta {
  id: number;
  usuario_id: number;
  puntaje: number;
  total_preguntas: number;
  porcentaje: number | null;
  nivel: string | null;
  creado_en: string;
}

export interface RespuestaDetalle {
  pregunta_id: number;
  situacion: string;
  tipo: string;
  categoria: string;
  opcion_elegida: number;
  respuesta_correcta: number;
  es_correcta: boolean;
  explicacion: string;
  consejo?: string;
  opciones: string[];
}

export interface IntentoDetalle {
  id: number;
  puntaje: number;
  total_preguntas: number;
  porcentaje: number | null;
  nivel: string | null;
  completado: boolean;
  pregunta_actual: number;
  creado_en: string;
  terminado_en: string | null;
  respuestas: RespuestaDetalle[];
  preguntas: Pregunta[];
}

export interface IntentoListaItem {
  id: number;
  puntaje: number;
  total_preguntas: number;
  porcentaje: number | null;
  nivel: string | null;
  completado: boolean;
  creado_en: string;
}

export interface QuizEstadisticas {
  total_intentos: number;
  promedio_porcentaje: number | null;
  mejor_porcentaje: number | null;
  mejor_nivel: string | null;
  ultimo_resultado: QuizResultadoRespuesta | null;
}

const API_URL = `${environment.apiUrl}/api/quiz`;

const STORAGE_KEY = 'quiz_intento_activo';

interface ProgresoGuardado {
  intento_id: number;
  pregunta_actual: number;
  puntaje: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${API_URL}/preguntas`);
  }

  iniciarQuiz(): Observable<IniciarQuizRespuesta> {
    return this.http.post<IniciarQuizRespuesta>(`${API_URL}/iniciar`, {});
  }

  responder(
    intentoId: number,
    preguntaId: number,
    opcionElegida: number
  ): Observable<ResponderRespuesta> {
    return this.http.post<ResponderRespuesta>(
      `${API_URL}/responder/${intentoId}`,
      { pregunta_id: preguntaId, opcion_elegida: opcionElegida }
    );
  }

  finalizarQuiz(intentoId: number): Observable<QuizResultadoRespuesta> {
    return this.http.post<QuizResultadoRespuesta>(
      `${API_URL}/finalizar/${intentoId}`,
      {}
    );
  }

  obtenerIntentos(): Observable<IntentoListaItem[]> {
    return this.http.get<IntentoListaItem[]>(`${API_URL}/intentos`);
  }

  obtenerDetalleIntento(intentoId: number): Observable<IntentoDetalle> {
    return this.http.get<IntentoDetalle>(`${API_URL}/intentos/${intentoId}`);
  }

  enviarResultado(
    puntaje: number,
    totalPreguntas: number
  ): Observable<QuizResultadoRespuesta> {
    return this.http.post<QuizResultadoRespuesta>(`${API_URL}/resultado`, {
      puntaje,
      total_preguntas: totalPreguntas,
    });
  }

  obtenerHistorial(): Observable<QuizResultadoRespuesta[]> {
    return this.http.get<QuizResultadoRespuesta[]>(`${API_URL}/historial`);
  }

  obtenerEstadisticas(): Observable<QuizEstadisticas> {
    return this.http.get<QuizEstadisticas>(`${API_URL}/estadisticas`);
  }

  guardarProgreso(progreso: ProgresoGuardado): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
  }

  obtenerProgreso(): ProgresoGuardado | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ProgresoGuardado;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  limpiarProgreso(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
