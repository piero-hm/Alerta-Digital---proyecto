import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface Alerta {
  fecha: string;
  tipo: string;
  descripcion: string;
  nivel: 'alto' | 'medio' | 'info';
}

interface QuickStat {
  icon: string;
  number: string;
  description: string;
  borderColor: string;
}

interface ModuleCard {
  icon: string;
  iconBgColor: string;
  title: string;
  description: string;
  points: string[];
  buttonText: string;
  buttonClass: string;
  routerLink: string;
}

interface QuickTip {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styles: [`
    :host {
      display: block;
      background-color: #0a0f1a;
      min-height: 100vh;
      color: #ffffff;
    }

    .container-fluid {
      padding-left: 15px;
      padding-right: 15px;
    }

    .section-title {
      font-family: 'Courier New', monospace;
      color: #00d4ff;
      font-size: 1.2rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
    }

    .section-title::after {
      content: '';
      flex-grow: 1;
      height: 1px;
      background-color: rgba(0, 212, 255, 0.3);
      margin-left: 1rem;
    }

    /* Hero Banner */
    .hero-banner {
      background-color: #0d1321;
      border-bottom: 1px solid #00d4ff;
      padding: 3rem 0;
      margin-bottom: 3rem;
    }

    .hero-banner .terminal-text {
      font-family: 'Courier New', monospace;
      color: #00d4ff;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
    }

    .hero-banner .online-indicator {
      color: #00ff00; /* Green dot */
      animation: pulse-online 1.5s infinite;
      margin-right: 5px;
    }

    @keyframes pulse-online {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .hero-banner h1 {
      font-size: 2.5rem;
      color: #ffffff;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .hero-banner .subtitle {
      color: #a8b2c1;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .hero-banner .badge {
      font-size: 0.8rem;
      padding: 0.5em 0.75em;
      border-radius: 0.25rem;
      margin-right: 0.5rem;
    }

    .badge-success-outline {
      background-color: rgba(0, 255, 136, 0.1);
      color: #00ff88;
      border: 1px solid #00ff88;
    }

    .badge-info-outline {
      background-color: rgba(0, 212, 255, 0.1);
      color: #00d4ff;
      border: 1px solid #00d4ff;
    }

    .terminal-panel {
      background-color: #060d16;
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 0.5rem;
      padding: 1.5rem;
      font-family: 'Courier New', monospace;
      color: #a8b2c1;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .terminal-panel strong {
      color: #00d4ff;
    }

    /* Cards General */
    .card {
      background-color: #0d1321;
      border: 1px solid rgba(0, 212, 255, 0.2);
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      height: 100%; /* Ensure cards in a row have equal height */
    }

    .card:hover {
      border-color: rgba(0, 212, 255, 0.6);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.1);
    }

    /* Quick Stats */
    .quick-stat-card {
      padding: 1.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .quick-stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background-color: var(--border-color); /* Dynamic border color */
    }

    .quick-stat-card .icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #a8b2c1;
    }

    .quick-stat-card .number {
      font-size: 1.8rem;
      font-weight: bold;
      color: #00d4ff; /* Default cian */
      margin-bottom: 0.25rem;
    }

    .quick-stat-card .number.text-success {
      color: #00ff88 !important;
    }

    .quick-stat-card .number.text-warning {
      color: #ff6b35 !important;
    }

    .quick-stat-card .description {
      color: #a8b2c1;
      font-size: 0.9rem;
    }

    /* Module Cards */
    .module-card {
      padding: 0;
      overflow: hidden;
    }

    .module-card .card-header {
      background-color: #060d16;
      padding: 1.5rem;
      text-align: center;
      position: relative;
    }

    .module-card .card-header .badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: rgba(0, 255, 136, 0.1);
      color: #00ff88;
      border: 1px solid #00ff88;
      font-size: 0.75rem;
      padding: 0.3em 0.6em;
      border-radius: 0.25rem;
    }

    .module-card .icon-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .module-card .icon-circle.bg-cyan { background-color: rgba(0, 212, 255, 0.1); color: #00d4ff; }
    .module-card .icon-circle.bg-green { background-color: rgba(0, 255, 136, 0.1); color: #00ff88; }
    .module-card .icon-circle.bg-orange { background-color: rgba(255, 107, 53, 0.1); color: #ff6b35; }


    .module-card .card-title {
      color: #ffffff;
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
    }

    .module-card .card-body {
      padding: 1.5rem;
    }

    .module-card .card-text {
      color: #a8b2c1;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }

    .module-card .list-unstyled li {
      color: #a8b2c1;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .module-card .list-unstyled li .accent-icon {
      color: #00d4ff;
      margin-right: 8px;
    }

    .module-card .btn-block {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border-radius: 0.3rem;
      transition: all 0.3s ease;
      text-decoration: none;
      display: block;
      text-align: center;
    }

    .btn-cyan {
      background-color: #00d4ff;
      color: #0a0f1a;
      border: 1px solid #00d4ff;
    }

    .btn-cyan:hover {
      background-color: #00b3e6;
      color: #0a0f1a;
    }

    .btn-outline-cyan {
      background-color: transparent;
      color: #00d4ff;
      border: 1px solid #00d4ff;
    }

    .btn-outline-cyan:hover {
      background-color: #00d4ff;
      color: #0a0f1a;
    }

    .btn-outline-orange {
      background-color: transparent;
      color: #ff6b35;
      border: 1px solid #ff6b35;
    }

    .btn-outline-orange:hover {
      background-color: #ff6b35;
      color: #0a0f1a;
    }

    /* Recent Alerts */
    .alerts-feed {
      background-color: #060d16;
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .alert-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem 0;
      border-bottom: 1px dashed rgba(168, 178, 193, 0.1);
      position: relative;
    }

    .alert-item:last-child {
      border-bottom: none;
    }

    .alert-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -1.5rem; /* Adjust to align with card padding */
      width: 3px;
      height: 100%;
    }

    .alert-item.level-alto::before { background-color: #ff6b35; }
    .alert-item.level-medio::before { background-color: #ffc107; } /* Using Bootstrap yellow for medium */
    .alert-item.level-info::before { background-color: #00d4ff; }

    .alert-item .alert-content {
      flex-grow: 1;
    }

    .alert-item .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .alert-item .alert-type-badge {
      font-size: 0.75rem;
      padding: 0.3em 0.6em;
      border-radius: 0.25rem;
    }

    .alert-item .alert-type-badge.bg-alto { background-color: rgba(255, 107, 53, 0.1); color: #ff6b35; border: 1px solid #ff6b35; }
    .alert-item .alert-type-badge.bg-medio { background-color: rgba(255, 193, 7, 0.1); color: #ffc107; border: 1px solid #ffc107; }
    .alert-item .alert-type-badge.bg-info { background-color: rgba(0, 212, 255, 0.1); color: #00d4ff; border: 1px solid #00d4ff; }


    .alert-item .alert-date {
      font-size: 0.8rem;
      color: #a8b2c1;
    }

    .alert-item .alert-description {
      color: #a8b2c1;
      font-size: 0.9rem;
    }

    /* Quick Tips */
    .quick-tip-card {
      display: flex;
      align-items: flex-start;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }

    .quick-tip-card .icon {
      font-size: 2rem;
      color: #00d4ff;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    .quick-tip-card .tip-content h5 {
      color: #ffffff;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .quick-tip-card .tip-content p {
      color: #a8b2c1;
      font-size: 0.9rem;
      margin-bottom: 0;
    }

    /* Responsive adjustments */
    @media (max-width: 767.98px) {
      .hero-banner {
        text-align: center;
      }
      .hero-banner .terminal-panel {
        margin-top: 2rem;
      }
      .quick-stat-card {
        margin-bottom: 1rem;
      }
      .module-card {
        margin-bottom: 1.5rem;
      }
      .alerts-feed {
        padding-left: 1.5rem; /* Adjust for pseudo-element */
      }
      .alert-item::before {
        left: 0;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  systemStatus = {
    modulesActive: '3/3',
    recentAlerts: '0',
    protectedUsers: '65,247',
    region: 'Junín, PE',
    version: 'v1.0.0'
  };

  quickStats: QuickStat[] = [
    { icon: '⚠️', number: '42,000+', description: 'Denuncias por ciberdelitos en Perú durante 2024', borderColor: '#ff6b35' },
    { icon: '👵', number: '65,247', description: 'Adultos mayores en la provincia de Huancayo', borderColor: '#00d4ff' },
    { icon: '💸', number: '67%', description: 'De los ciberdelitos son fraude informático', borderColor: '#ff6b35' },
    { icon: '🛡️', number: '3', description: 'Módulos disponibles para protegerte', borderColor: '#00ff88' },
  ];

  modules: ModuleCard[] = [
    {
      icon: '📚',
      iconBgColor: 'bg-cyan',
      title: 'Educación Digital',
      description: 'Aprende a reconocer los tipos de estafas digitales más comunes en Perú. Contenido adaptado y explicado de forma simple.',
      points: ['› Phishing y páginas falsas', '› Llamadas y mensajes engañosos', '› Fraude con Yape y Plin'],
      buttonText: 'Ir al módulo →',
      buttonClass: 'btn-cyan',
      routerLink: '/educacion'
    },
    {
      icon: '🧠',
      iconBgColor: 'bg-green',
      title: 'Quiz Interactivo',
      description: 'Pon a prueba tus conocimientos con 8 situaciones reales de fraude. Aprende practicando en un entorno seguro.',
      points: ['› 8 preguntas con casos reales', '› Retroalimentación inmediata', '› Puntaje y recomendaciones'],
      buttonText: 'Comenzar quiz →',
      buttonClass: 'btn-outline-cyan',
      routerLink: '/quiz'
    },
    {
      icon: '🚨',
      iconBgColor: 'bg-orange',
      title: 'Reportar Incidente',
      description: '¿Recibiste un mensaje sospechoso o fuiste víctima de un intento de estafa? Repórtalo y ayuda a proteger a tu comunidad.',
      points: ['› Registro de incidentes', '› Historial de tus reportes', '› Contribuye a alertar a otros'],
      buttonText: 'Hacer reporte →',
      buttonClass: 'btn-outline-orange',
      routerLink: '/reportes'
    }
  ];

  recentAlerts: Alerta[] = [
    { fecha: 'Hace 2 horas', tipo: 'Vishing', descripcion: 'Reportes de llamadas falsas suplantando al BCP en la zona de El Tambo, Huancayo.', nivel: 'alto' },
    { fecha: 'Hace 5 horas', tipo: 'WhatsApp', descripcion: 'Mensajes falsos circulando con supuestos bonos del MIDIS. No hagas clic en los enlaces.', nivel: 'alto' },
    { fecha: 'Ayer', tipo: 'Yape', descripcion: 'Estafa del Yape equivocado reportada en el mercado Modelo de Huancayo.', nivel: 'medio' },
    { fecha: 'Hace 3 días', tipo: 'Phishing', descripcion: 'Correos falsos imitando a la SUNAT detectados en usuarios de la región Junín.', nivel: 'medio' },
  ];

  quickTips: QuickTip[] = [
    { icon: '🔒', title: 'Nunca compartas tu código SMS', text: 'Ningún banco ni aplicación te pedirá el código que llega a tu celular. Si alguien lo pide, es una estafa.' },
    { icon: '📞', title: 'Verifica antes de actuar', text: 'Si recibes una llamada de emergencia de un familiar, corta y llama tú directamente al número que tienes guardado.' },
    { icon: '🔗', title: 'Revisa el enlace antes de hacer clic', text: 'Los bancos reales tienen dominios simples como viabcp.com. Si el enlace tiene palabras extra o raras, no hagas clic.' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUsuarioActual();
    if (currentUser) {
      this.userName = currentUser.nombre;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
