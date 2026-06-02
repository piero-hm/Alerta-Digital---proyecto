import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgClass } from '@angular/common';
import { QuizService, Pregunta } from './quiz.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, NgFor, NgIf, NgClass],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  preguntas: Pregunta[] = [];
  preguntaActual: number = 0;
  respondida: boolean = false;
  opcionElegida: number | null = null;
  puntaje: number = 0;
  quizTerminado: boolean = false;
  historialRespuestas: boolean[] = []; // true si correcta, false si incorrecta

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.reiniciar();
  }

  reiniciar(): void {
    this.preguntas = this.quizService.getPreguntas();
    this.preguntaActual = 0;
    this.respondida = false;
    this.opcionElegida = null;
    this.puntaje = 0;
    this.quizTerminado = false;
    this.historialRespuestas = Array(this.preguntas.length).fill(false);
  }

  getPreguntaActual(): Pregunta {
    return this.preguntas[this.preguntaActual];
  }

  responder(indiceOpcion: number): void {
    if (this.respondida) {
      return;
    }
    this.respondida = true;
    this.opcionElegida = indiceOpcion;

    const pregunta = this.getPreguntaActual();
    const esCorrecta = (indiceOpcion === pregunta.respuestaCorrecta);

    if (esCorrecta) {
      this.puntaje++;
    }
    this.historialRespuestas[this.preguntaActual] = esCorrecta;
  }

  siguiente(): void {
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
      this.respondida = false;
      this.opcionElegida = null;
    } else {
      this.quizTerminado = true;
    }
  }

  get porcentajeProgreso(): number {
    if (this.preguntas.length === 0) return 0;
    return ((this.preguntaActual) / this.preguntas.length) * 100;
  }

  getTipoPregunta(id: number): string {
    switch (id) {
      case 1: return 'WhatsApp';
      case 2: return 'Vishing';
      case 3: return 'Phishing';
      case 4: return 'Yape / Plin';
      case 5: return 'Redes Sociales';
      case 6: return 'Correo Falso';
      case 7: return 'IA / Deepfake';
      case 8: return 'Falso Soporte';
      default: return 'General';
    }
  }

  getMensajeFinal(): { titulo: string, mensaje: string, color: string } {
    const aciertos = this.puntaje;
    const total = this.preguntas.length;

    if (aciertos >= 7) {
      return {
        titulo: '¡Excelente resultado!',
        mensaje: 'Estás muy bien preparado para identificar estafas digitales. Comparte este conocimiento con tus familiares.',
        color: 'verde'
      };
    } else if (aciertos >= 5) {
      return {
        titulo: '¡Buen trabajo!',
        mensaje: 'Vas por buen camino. Te recomendamos repasar los temas de Phishing y Vishing en el módulo educativo.',
        color: 'cian'
      };
    } else {
      return {
        titulo: 'Necesitas repasar',
        mensaje: 'No te preocupes. Revisa el módulo de Educación Digital y vuelve a intentarlo. Aprender esto puede protegerte de perder tus ahorros.',
        color: 'naranja'
      };
    }
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 es el código ASCII para 'A'
  }
}
