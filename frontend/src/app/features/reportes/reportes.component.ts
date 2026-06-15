import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ReportesService, Reporte, ReporteCrear } from './reportes.service';

type TabActivo = 'nuevo' | 'historial';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit, AfterViewInit {
  activeTab: TabActivo = 'nuevo';

  tipoFraude = '';
  medio = '';
  descripcion = '';
  tienePerdida = false;
  montoAfectado: number | null = null;

  formSubmitted = false;
  successMessage = '';
  loading = false;
  searchTerm = '';

  misReportes: Reporte[] = [];

  tiposFraudeOptions = [
    'Phishing',
    'Vishing',
    'Smishing',
    'Fraude Yape/Plin',
    'Suplantación',
    'Otro',
  ];

  medioOptions = [
    'WhatsApp',
    'Llamada',
    'Correo',
    'SMS',
    'Redes sociales',
    'Presencial',
    'Otro',
  ];

  private observer: IntersectionObserver | null = null;

  constructor(
    private reportesService: ReportesService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  cargarReportes(): void {
    this.reportesService.getReportes().subscribe({
      next: (data) => {
        this.misReportes = data;
        this.cdr.detectChanges();
        this.refreshScrollAnimations();
      },
      error: () => (this.misReportes = []),
    });
  }

  setTab(tab: TabActivo): void {
    this.activeTab = tab;
    setTimeout(() => this.refreshScrollAnimations(), 50);
  }

  onSubmitReport(): void {
    this.formSubmitted = true;
    this.successMessage = '';

    if (!this.validateForm()) return;

    const nuevoReporte: ReporteCrear = {
      tipo_fraude: this.tipoFraude,
      descripcion: this.descripcion.trim(),
      medio: this.medio || null,
      monto_afectado: this.tienePerdida ? this.montoAfectado : null,
    };

    this.loading = true;
    this.reportesService.crearReporte(nuevoReporte).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage =
          'Tu reporte fue registrado correctamente. Gracias por ayudar a proteger a tu comunidad.';
        this.resetForm();
        this.cargarReportes();
        this.activeTab = 'historial';
        this.cdr.detectChanges();
        setTimeout(() => this.refreshScrollAnimations(), 50);
      },
      error: () => {
        this.loading = false;
        this.successMessage = '';
      },
    });
  }

  validateForm(): boolean {
    return !!(
      this.tipoFraude &&
      this.descripcion &&
      this.descripcion.trim().length >= 10
    );
  }

  resetForm(): void {
    this.tipoFraude = '';
    this.medio = '';
    this.descripcion = '';
    this.tienePerdida = false;
    this.montoAfectado = null;
    this.formSubmitted = false;
  }

  get reportesFiltrados(): Reporte[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.misReportes;
    return this.misReportes.filter(
      (r) =>
        r.tipo_fraude.toLowerCase().includes(term) ||
        (r.medio && r.medio.toLowerCase().includes(term)) ||
        r.estado.toLowerCase().includes(term) ||
        r.descripcion.toLowerCase().includes(term)
    );
  }

  get totalReportes(): number {
    return this.misReportes.length;
  }

  get reportesEnRevision(): number {
    return this.misReportes.filter((r) => r.estado === 'revisado').length;
  }

  get reportesAtendidos(): number {
    return this.misReportes.filter((r) => r.estado === 'resuelto').length;
  }

  get reportesPendientes(): number {
    return this.misReportes.filter((r) => r.estado === 'pendiente').length;
  }

  get reportesConPerdida(): number {
    return this.misReportes.filter((r) => r.monto_afectado !== null).length;
  }

  get montoTotal(): number {
    return this.misReportes.reduce(
      (acc, r) => acc + (r.monto_afectado ?? 0),
      0
    );
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'resuelto':
        return 'badge badge--success';
      case 'revisado':
        return 'badge badge--warning';
      case 'pendiente':
        return 'badge badge--info';
      default:
        return 'badge badge--neutral';
    }
  }

  getBadgeIcon(estado: string): string {
    switch (estado) {
      case 'resuelto':
        return 'check_circle';
      case 'revisado':
        return 'rate_review';
      case 'pendiente':
        return 'schedule';
      default:
        return 'help';
    }
  }

  formatEstado(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'revisado':
        return 'En revisión';
      case 'resuelto':
        return 'Atendido';
      default:
        return estado;
    }
  }

  formatMonto(monto: number | null): string {
    if (monto === null || monto === undefined) return '—';
    return `S/ ${monto.toLocaleString('es-PE')}`;
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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
}
