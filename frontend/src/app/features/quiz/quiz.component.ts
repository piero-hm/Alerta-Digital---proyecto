import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService, Pregunta, ResponderRespuesta } from './quiz.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { firstValueFrom, timeout } from 'rxjs';

interface CategoriaInfo {
  icon: string;
  color: string;
  bg: string;
  border: string;
}

const CATEGORIAS: Record<string, CategoriaInfo> = {
  'Suplantación': { icon: 'person_search', color: '#ff6b35', bg: 'rgba(255,107,53,0.12)', border: 'rgba(255,107,53,0.3)' },
  'Llamada fraudulenta': { icon: 'phone_enabled', color: '#ff4757', bg: 'rgba(255,71,87,0.12)', border: 'rgba(255,71,87,0.3)' },
  'SMS falso': { icon: 'sms', color: '#ff4757', bg: 'rgba(255,71,87,0.12)', border: 'rgba(255,71,87,0.3)' },
  'Falsa transferencia': { icon: 'swap_horiz', color: '#72e6ff', bg: 'rgba(114,230,255,0.12)', border: 'rgba(114,230,255,0.3)' },
  'Falso sorteo': { icon: 'celebration', color: '#ffc800', bg: 'rgba(255,200,0,0.12)', border: 'rgba(255,200,0,0.3)' },
  'Suplantación de entidad': { icon: 'corporate_fare', color: '#ff6b35', bg: 'rgba(255,107,53,0.12)', border: 'rgba(255,107,53,0.3)' },
  'Clonación de voz': { icon: 'record_voice_over', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)' },
  'Soporte técnico falso': { icon: 'support', color: '#ff4757', bg: 'rgba(255,71,87,0.12)', border: 'rgba(255,71,87,0.3)' },
  'Falso premio': { icon: 'card_giftcard', color: '#ffc800', bg: 'rgba(255,200,0,0.12)', border: 'rgba(255,200,0,0.3)' },
  'Alquiler falso': { icon: 'real_estate_agent', color: '#ff6b35', bg: 'rgba(255,107,53,0.12)', border: 'rgba(255,107,53,0.3)' },
  'Devolución de impuestos': { icon: 'receipt_long', color: '#4fdbcc', bg: 'rgba(79,219,204,0.12)', border: 'rgba(79,219,204,0.3)' },
  'Falso cobro': { icon: 'money_off', color: '#ff4757', bg: 'rgba(255,71,87,0.12)', border: 'rgba(255,71,87,0.3)' },
};

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, AfterViewInit, OnDestroy {
  preguntas: Pregunta[] = [];
  preguntaActual = 0;
  preguntaEnCurso: Pregunta | null = null;
  respondida = false;
  opcionElegida: number | null = null;
  puntaje = 0;
  quizTerminado = false;
  historialRespuestas: boolean[] = [];
  enviandoResultado = false;
  resultadoGuardado = false;
  cargando = true;
  error = '';

  intentoId: number | null = null;
  ultimaRespuesta: ResponderRespuesta | null = null;

  private observer: IntersectionObserver | null = null;

  constructor(
    private quizService: QuizService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.iniciarONoReanudar();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private async iniciarONoReanudar(): Promise<void> {
    this.cargando = true;
    this.error = '';
    console.log('[Quiz] Iniciando quiz...');

    try {
      const progreso = this.quizService.obtenerProgreso();
      console.log('[Quiz] Progreso guardado:', progreso);

      if (progreso) {
        try {
          const detalle = await firstValueFrom(
            this.quizService.obtenerDetalleIntento(progreso.intento_id).pipe(timeout(15000))
          );
          console.log('[Quiz] Intento encontrado, completado:', detalle.completado);
          if (!detalle.completado) {
            this.restaurarDesdeProgreso(detalle, progreso);
            this.cargando = false;
            this.cdr.detectChanges();
            console.log('[Quiz] Quiz restaurado exitosamente');
            return;
          }
        } catch (e) {
          console.warn('[Quiz] Error al restaurar intento, creando nuevo:', e);
          this.quizService.limpiarProgreso();
        }
      }

      console.log('[Quiz] Solicitando nuevo quiz al servidor...');
      const resp = await firstValueFrom(
        this.quizService.iniciarQuiz().pipe(timeout(30000))
      );
      console.log('[Quiz] Quiz recibido, preguntas:', resp.preguntas?.length);
      this.intentoId = resp.intento_id;
      this.preguntas = resp.preguntas;
      this.reiniciarEstado();
    } catch (err: any) {
      console.error('[Quiz] Error:', err);
      if (err?.name === 'TimeoutError') {
        this.error = 'El servidor no respondió a tiempo. Verifica que el backend esté funcionando.';
      } else if (err?.status === 401) {
        this.error = 'Tu sesión expiró. Inicia sesión nuevamente.';
      } else if (err?.status === 404) {
        this.error = 'No hay preguntas disponibles en este momento.';
      } else if (err?.message?.includes('HttpErrorResponse')) {
        this.error = 'No se pudo conectar con el servidor. Verifica que el backend esté activo.';
      } else {
        this.error = 'Error al cargar el quiz. Intenta de nuevo.';
      }
      this.cdr.detectChanges();
      setTimeout(() => this.refreshScrollAnimations(), 50);
    } finally {
      this.cargando = false;
    this.cdr.detectChanges();
    this.refreshScrollAnimations();
    console.log('[Quiz] Estado cargando finalizado');
    }
  }

  private restaurarDesdeProgreso(detalle: any, progreso: any): void {
    this.intentoId = detalle.id;
    this.preguntas = detalle.preguntas;
    this.puntaje = detalle.puntaje;
    this.preguntaActual = detalle.pregunta_actual;

    const idxPorPregunta = new Map<number, boolean>(
      detalle.respuestas.map((r: any) => [r.pregunta_id, r.es_correcta as boolean])
    );
    this.historialRespuestas = this.preguntas.map(
      (p: any) => idxPorPregunta.get(p.id) ?? false
    );

    if (this.preguntaActual >= this.preguntas.length) {
      this.quizTerminado = true;
    } else {
      const pregunta = this.preguntas[this.preguntaActual];
      if (!pregunta) return;
      this.preguntaEnCurso = pregunta;
      const yaRespondida = idxPorPregunta.has(pregunta.id);
      this.respondida = yaRespondida;
      this.opcionElegida = yaRespondida
        ? (detalle.respuestas.find((r: any) => r.pregunta_id === pregunta.id)?.opcion_elegida ?? null)
        : null;
      this.ultimaRespuesta = yaRespondida
        ? detalle.respuestas.find((r: any) => r.pregunta_id === pregunta.id)
        : null;
    }
    this.cdr.detectChanges();
    this.refreshScrollAnimations();
  }

  private reiniciarEstado(): void {
    this.preguntaActual = 0;
    this.preguntaEnCurso = this.preguntas[0] || null;
    this.respondida = false;
    this.opcionElegida = null;
    this.puntaje = 0;
    this.quizTerminado = false;
    this.enviandoResultado = false;
    this.resultadoGuardado = false;
    this.ultimaRespuesta = null;
    this.historialRespuestas = Array(this.preguntas.length).fill(false);
    this.guardarProgreso();
      this.cdr.detectChanges();
      this.refreshScrollAnimations();
    }

  private guardarProgreso(): void {
    if (!this.intentoId) return;
    this.quizService.guardarProgreso({
      intento_id: this.intentoId,
      pregunta_actual: this.preguntaActual,
      puntaje: this.puntaje,
    });
  }

  getInfoCategoria(categoria: string): CategoriaInfo {
    return (
      CATEGORIAS[categoria] || {
        icon: 'security',
        color: '#72e6ff',
        bg: 'rgba(114,230,255,0.12)',
        border: 'rgba(114,230,255,0.3)',
      }
    );
  }

  async responder(indiceOpcion: number): Promise<void> {
    if (this.respondida || !this.preguntaEnCurso || !this.intentoId) return;

    this.respondida = true;
    this.opcionElegida = indiceOpcion;

    try {
      const resp = await firstValueFrom(
        this.quizService.responder(
          this.intentoId,
          this.preguntaEnCurso.id,
          indiceOpcion
        )
      );

      this.ultimaRespuesta = resp;
      this.puntaje = resp.puntaje_actual;
      this.historialRespuestas[this.preguntaActual] = resp.es_correcta;
      this.guardarProgreso();
    } catch (err) {
      console.error('Error al enviar respuesta:', err);
      const esCorrecta =
        indiceOpcion === this.preguntaEnCurso.respuesta_correcta;
      if (esCorrecta) this.puntaje++;
      this.historialRespuestas[this.preguntaActual] = esCorrecta;
      this.ultimaRespuesta = {
        es_correcta: esCorrecta,
        respuesta_correcta: this.preguntaEnCurso.respuesta_correcta,
        explicacion: this.preguntaEnCurso.explicacion,
        consejo: this.preguntaEnCurso.consejo,
        pregunta_actual: this.preguntaActual + 1,
        total_preguntas: this.preguntas.length,
        puntaje_actual: this.puntaje,
      };
    }
  }

  async siguiente(): Promise<void> {
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
      this.preguntaEnCurso = this.preguntas[this.preguntaActual];
      this.respondida = false;
      this.opcionElegida = null;
      this.ultimaRespuesta = null;
      this.guardarProgreso();
    } else {
      this.quizTerminado = true;
      this.quizService.limpiarProgreso();
      await this.finalizarQuiz();
    }
  }

  private async finalizarQuiz(): Promise<void> {
    if (!this.intentoId) return;
    this.enviandoResultado = true;
    this.cdr.detectChanges();
    this.refreshScrollAnimations();
    try {
      await firstValueFrom(this.quizService.finalizarQuiz(this.intentoId));
      this.resultadoGuardado = true;
    } catch (err) {
      console.error('Error al finalizar quiz:', err);
    } finally {
      this.enviandoResultado = false;
      this.cdr.detectChanges();
      this.refreshScrollAnimations();
    }
  }

  async reiniciar(): Promise<void> {
    this.quizService.limpiarProgreso();
    this.preguntas = [];
    this.preguntaEnCurso = null;
    this.ultimaRespuesta = null;
    this.quizTerminado = false;
    await this.iniciarONoReanudar();
  }

  get porcentajeProgreso(): number {
    if (this.preguntas.length === 0) return 0;
    return ((this.preguntaActual + 1) / this.preguntas.length) * 100;
  }

  getMensajeFinal(): { titulo: string; mensaje: string; emoji: string } {
    const total = this.preguntas.length;
    const pct = total > 0 ? (this.puntaje / total) * 100 : 0;

    if (pct >= 90) {
      return {
        titulo: '¡Experto en Ciberseguridad!',
        mensaje:
          'Estás muy bien preparado para identificar estafas digitales. Sigue así y comparte este conocimiento con tus familiares y amigos.',
        emoji: '🏆',
      };
    } else if (pct >= 70) {
      return {
        titulo: '¡Muy buen trabajo!',
        mensaje:
          'Tienes un buen nivel de conocimiento. Te recomendamos repasar los temas donde fallaste para estar aún más protegido.',
        emoji: '🌟',
      };
    } else if (pct >= 50) {
      return {
        titulo: 'Vas por buen camino',
        mensaje:
          'Has logrado la mitad de respuestas correctas. Revisa los módulos educativos para reforzar tus conocimientos y vuelve a intentarlo.',
        emoji: '💪',
      };
    } else {
      return {
        titulo: 'Sigue practicando',
        mensaje:
          'No te preocupes, esto es parte del aprendizaje. Revisa el módulo de Educación Digital y vuelve a intentarlo. Cada vez estarás más preparado.',
        emoji: '📚',
      };
    }
  }

  getNivelSeguridad(): { label: string; color: string; pct: number } {
    const total = this.preguntas.length;
    const pct = total > 0 ? (this.puntaje / total) * 100 : 0;

    if (pct >= 90) return { label: 'Experto', color: '#4fdbcc', pct };
    if (pct >= 70) return { label: 'Avanzado', color: '#72e6ff', pct };
    if (pct >= 50) return { label: 'Intermedio', color: '#ffb86b', pct };
    return { label: 'Principiante', color: '#ff4757', pct };
  }

  getLetra(index: number): string {
    return String.fromCharCode(65 + index);
  }

  private refreshScrollAnimations(): void {
    const elements = this.elementRef.nativeElement.querySelectorAll(
      '.animate-on-scroll'
    );
    elements.forEach((el: Element) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 40 && rect.bottom > 0;
      if (isVisible) {
        el.classList.add('is-visible');
      } else if (this.observer) {
        this.observer.observe(el);
      }
    });
  }

  private setupScrollAnimations(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    this.refreshScrollAnimations();
  }
}
