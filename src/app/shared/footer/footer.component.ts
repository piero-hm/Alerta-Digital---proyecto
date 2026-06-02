import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer mt-auto py-4">
      <div class="container">
        <div class="row">
          <!-- Columna 1 — Identidad -->
          <div class="col-md-4 mb-4 mb-md-0">
            <div class="footer-logo mb-2">
              <span class="shield-icon">🛡️</span> CIBERSEGURO
            </div>
            <div class="footer-subtitle mb-3">HUANCAYO // SECURE PLATFORM</div>
            <p class="footer-text">Plataforma de educación digital y prevención de estafas para adultos mayores de la región Junín, Perú.</p>
            <p class="footer-text-small">Desarrollado por estudiantes de Ingeniería de Software — Universidad Continental</p>
          </div>

          <!-- Columna 2 — Navegación -->
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="footer-heading mb-3">MÓDULOS</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/dashboard" class="footer-link">Inicio</a></li>
              <li><a routerLink="/educacion" class="footer-link">Educación Digital</a></li>
              <li><a routerLink="/quiz" class="footer-link">Quiz Interactivo</a></li>
              <li><a routerLink="/reportes" class="footer-link">Reportar Incidente</a></li>
            </ul>
          </div>

          <!-- Columna 3 — Información de emergencia -->
          <div class="col-md-4">
            <h5 class="footer-heading mb-3">CONTACTOS DE EMERGENCIA</h5>
            <ul class="list-unstyled">
              <li><span class="accent-icon">›</span> PNP — Línea 105</li>
              <li><span class="accent-icon">›</span> DIVINDAT — 942 440 729</li>
              <li><span class="accent-icon">›</span> Indecopi — 224-7777</li>
              <li><span class="accent-icon">›</span> Central de Emergencias — 116</li>
            </ul>
          </div>
        </div>
        <hr class="footer-divider my-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p class="footer-text-small mb-2 mb-md-0">© 2025 CiberSeguro Huancayo — Proyecto de Impacto Social — Programación Web</p>
          <p class="footer-text-small mb-0">Ley N° 30096 — Ley de Delitos Informáticos del Perú</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #060d16;
      border-top: 1px solid rgba(0, 212, 255, 0.2);
      color: #a8b2c1;
      font-size: 0.9rem;
    }

    .footer-logo {
      font-family: 'Courier New', monospace;
      font-size: 1.2rem;
      color: #00d4ff;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
    }

    .footer-logo .shield-icon {
      margin-right: 8px;
      color: #00d4ff;
    }

    .footer-subtitle {
      font-size: 0.7rem;
      color: #a8b2c1;
      margin-top: -5px;
      margin-left: 30px; /* Align with logo text */
    }

    .footer-heading {
      color: #00d4ff;
      font-size: 0.9rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .footer-link {
      color: #a8b2c1;
      text-decoration: none;
      transition: color 0.3s ease;
      display: block;
      margin-bottom: 0.5rem;
    }

    .footer-link:hover {
      color: #ffffff;
    }

    .footer-text {
      color: #a8b2c1;
      line-height: 1.6;
    }

    .footer-text-small {
      font-size: 0.8rem;
      color: #a8b2c1;
    }

    .accent-icon {
      color: #00d4ff;
      margin-right: 8px;
    }

    .list-unstyled li {
      margin-bottom: 0.5rem;
    }

    .footer-divider {
      border-color: rgba(0, 212, 255, 0.1);
    }
  `]
})
export class FooterComponent { }
