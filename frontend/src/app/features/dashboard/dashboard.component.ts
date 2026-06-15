import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom, timeout } from 'rxjs';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { environment } from '../../../environments/environment';

interface DashboardStats {
  total_reportes: number;
  reportes_por_estado: Record<string, number>;
  promedio_quiz: number;
  mejor_puntaje_quiz: number;
  total_intentos_quiz: number;
  ultimo_resultado_quiz: {
    puntaje: number;
    total_preguntas: number;
    porcentaje: number;
    nivel: string;
  } | null;
  tipos_fraude: Record<string, number>;
}

const STATS_API = `${environment.apiUrl}/api/stats/resumen`;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  userName = '';
  userInitial = '';
  chartImageUrl = '/assets/images/incidentes-chart.png';

  stats: DashboardStats | null = null;
  statsLoading = true;

  currentTipIndex = 0;
  private tipInterval: ReturnType<typeof setInterval> | null = null;

  safetyTips = [
    {
      icon: 'lock',
      title: 'Contraseñas seguras',
      text: 'Usa contraseñas distintas para cada servicio. Combina letras, números y símbolos. Nunca compartas tus claves.',
      color: '#4fdbcc',
    },
    {
      icon: 'email',
      title: 'Correos sospechosos',
      text: 'No hagas clic en enlaces de remitentes desconocidos. Los bancos nunca piden datos personales por correo.',
      color: '#72e6ff',
    },
    {
      icon: 'phone_in_talk',
      title: 'Llamadas fraudulentas',
      text: 'Cuelga si te piden dinero urgente o datos bancarios. Las instituciones legítimas no presionan por teléfono.',
      color: '#ffa73c',
    },
    {
      icon: 'smartphone',
      title: 'Mensajes de texto falsos',
      text: 'No respondas a SMS con enlaces de premios o alertas bancarias. Verifica siempre con tu banco.',
      color: '#ffb86b',
    },
    {
      icon: 'verified_user',
      title: 'Verificación en dos pasos',
      text: 'Activa la autenticación en dos pasos en todas tus cuentas. Es la mejor defensa contra robos.',
      color: '#4ade80',
    },
  ];

  modules = [
    {
      id: 1,
      icon: 'phishing',
      borderGlow: 'rgba(114, 230, 255, 0.4)',
      title: 'Prevención de Phishing',
      description:
        'Aprende a identificar correos y mensajes de texto falsos que intentan robar tu información personal.',
      routerLink: '/educacion/modulo/1',
      color: '#72e6ff',
    },
    {
      id: 2,
      icon: 'password',
      borderGlow: 'rgba(79, 219, 204, 0.4)',
      title: 'Contraseñas Seguras',
      description:
        'Técnicas sencillas para crear y recordar contraseñas fuertes que protejan tus cuentas bancarias.',
      routerLink: '/educacion/modulo/2',
      color: '#4fdbcc',
    },
    {
      id: 3,
      icon: 'support_agent',
      borderGlow: 'rgba(255, 184, 107, 0.4)',
      title: 'Fraudes Telefónicos',
      description:
        'Reconoce las llamadas engañosas y sabe cómo actuar cuando te piden dinero o datos con urgencia.',
      routerLink: '/educacion/modulo/3',
      color: '#ffb86b',
    },
  ];

  private observer: IntersectionObserver | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.authService.usuarioActual();
    if (user) {
      this.userName = user.nombre;
      this.userInitial = user.nombre.charAt(0).toUpperCase();
    } else {
      this.router.navigate(['/login']);
    }

    await this.cargarStats();
    this.startTipRotation();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.tipInterval) {
      clearInterval(this.tipInterval);
    }
  }

  private async cargarStats(): Promise<void> {
    this.statsLoading = true;
    try {
      const data = await firstValueFrom(
        this.http.get<DashboardStats>(STATS_API).pipe(timeout(15000))
      );
      this.stats = data;
    } catch {
      this.stats = null;
    } finally {
      this.statsLoading = false;
      this.cdr.detectChanges();
      this.refreshScrollAnimations();
    }
  }

  private startTipRotation(): void {
    this.tipInterval = setInterval(() => {
      this.currentTipIndex = (this.currentTipIndex + 1) % this.safetyTips.length;
      this.cdr.detectChanges();
    }, 6000);
  }

  goToTip(index: number): void {
    this.currentTipIndex = index;
    if (this.tipInterval) {
      clearInterval(this.tipInterval);
      this.startTipRotation();
    }
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

    const elements = this.elementRef.nativeElement.querySelectorAll(
      '.animate-on-scroll'
    );
    elements.forEach((el: Element) => this.observer?.observe(el));
  }

  private refreshScrollAnimations(): void {
    setTimeout(() => {
      const elements = this.elementRef.nativeElement.querySelectorAll(
        '.animate-on-scroll:not(.is-visible)'
      );
      elements.forEach((el: Element) => this.observer?.observe(el));
    }, 50);
  }

  get totalReportes(): number {
    return this.stats?.total_reportes ?? 0;
  }

  get totalIntentosQuiz(): number {
    return this.stats?.total_intentos_quiz ?? 0;
  }

  get promedioQuiz(): number {
    return this.stats?.promedio_quiz ?? 0;
  }

  get mejorPuntaje(): number {
    return this.stats?.mejor_puntaje_quiz ?? 0;
  }

  get ultimoNivel(): string {
    return this.stats?.ultimo_resultado_quiz?.nivel ?? '—';
  }

  get ultimoPorcentaje(): number {
    return this.stats?.ultimo_resultado_quiz?.porcentaje ?? 0;
  }

  get reportesPendientes(): number {
    return this.stats?.reportes_por_estado?.['pendiente'] ?? 0;
  }

  get reportesResueltos(): number {
    return this.stats?.reportes_por_estado?.['resuelto'] ?? 0;
  }

  get reportesRevisados(): number {
    return this.stats?.reportes_por_estado?.['revisado'] ?? 0;
  }

  get tiposFraudeKeys(): string[] {
    return this.stats?.tipos_fraude ? Object.keys(this.stats.tipos_fraude) : [];
  }

  get tiposFraudeTotal(): number {
    if (!this.stats?.tipos_fraude) return 0;
    return Object.values(this.stats.tipos_fraude).reduce((a, b) => a + b, 0);
  }

  get nivelClase(): string {
    const nivel = this.ultimoNivel;
    if (nivel === 'Avanzado' || nivel === 'Experto') return 'success';
    if (nivel === 'Intermedio') return 'info';
    return 'warning';
  }

  get nivelIcono(): string {
    const nivel = this.ultimoNivel;
    if (nivel === 'Avanzado' || nivel === 'Experto') return 'workspace_premium';
    if (nivel === 'Intermedio') return 'trending_up';
    return 'school';
  }

  get currentTip() {
    return this.safetyTips[this.currentTipIndex];
  }
}
