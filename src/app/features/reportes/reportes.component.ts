import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ReportesService, Reporte, ResumenReportes } from './reportes.service';

type TabActivo = 'nuevo' | 'historial';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  activeTab: TabActivo = 'nuevo';

  tipoEstafa = '';
  canal = '';
  descripcion = '';
  perdidaEconomica = false;
  monto: number | null = null;
  fechaIncidente = '';

  formSubmitted = false;
  successMessage = '';
  searchTerm = '';

  misReportes: Reporte[] = [];
  resumen: ResumenReportes = {
    total: 0,
    recibidos: 0,
    enRevision: 0,
    atendidos: 0,
    conPerdidaEconomica: 0,
    montoTotal: 0
  };

  tiposEstafaOptions = [
    'Llamada telefónica falsa',
    'Mensaje de WhatsApp',
    'Correo electrónico sospechoso',
    'SMS fraudulento',
    'Fraude con Yape o Plin',
    'Página web falsa',
    'Otro'
  ];

  canalOptions = [
    'Llamada telefónica',
    'WhatsApp',
    'SMS',
    'Correo electrónico',
    'Redes sociales',
    'Presencial'
  ];

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.misReportes = this.reportesService.getReportes();
    this.resumen = this.reportesService.getResumen();
  }

  setTab(tab: TabActivo): void {
    this.activeTab = tab;
  }

  onSubmitReport(): void {
    this.formSubmitted = true;
    this.successMessage = '';

    if (!this.validateForm()) return;

    const nuevoReporte = {
      fecha: this.fechaIncidente,
      tipoEstafa: this.tipoEstafa,
      canal: this.canal,
      descripcion: this.descripcion.trim(),
      perdidaEconomica: this.perdidaEconomica,
      monto: this.perdidaEconomica ? this.monto : null
    };

    this.reportesService.agregarReporte(nuevoReporte);
    this.successMessage = 'Tu reporte fue registrado correctamente. Gracias por ayudar a proteger a tu comunidad.';
    this.resetForm();
    this.loadReports();
    this.activeTab = 'historial';
  }

  validateForm(): boolean {
    return !!(
      this.tipoEstafa &&
      this.canal &&
      this.descripcion &&
      this.descripcion.trim().length >= 20 &&
      this.fechaIncidente &&
      (!this.perdidaEconomica || (this.monto !== null && this.monto > 0))
    );
  }

  resetForm(): void {
    this.tipoEstafa = '';
    this.canal = '';
    this.descripcion = '';
    this.perdidaEconomica = false;
    this.monto = null;
    this.fechaIncidente = '';
    this.formSubmitted = false;
  }

  get reportesFiltrados(): Reporte[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) return this.misReportes;

    return this.misReportes.filter(reporte =>
      reporte.tipoEstafa.toLowerCase().includes(term) ||
      reporte.canal.toLowerCase().includes(term) ||
      reporte.estado.toLowerCase().includes(term) ||
      reporte.descripcion.toLowerCase().includes(term)
    );
  }

  get totalReportes(): number {
    return this.resumen.total;
  }

  get reportesAtendidos(): number {
    return this.resumen.atendidos;
  }

  get reportesEnRevision(): number {
    return this.resumen.enRevision;
  }

  get reportesConPerdida(): number {
    return this.resumen.conPerdidaEconomica;
  }

  get montoTotal(): number {
    return this.resumen.montoTotal;
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Atendido':
        return 'status status-success';
      case 'En revisión':
        return 'status status-warning';
      case 'Recibido':
        return 'status status-info';
      default:
        return 'status status-neutral';
    }
  }

  formatMonto(monto: number | null): string {
    if (monto === null || monto === undefined) return '—';
    return `S/ ${monto.toLocaleString('es-PE')}`;
  }
}
