import { Injectable } from '@angular/core';

export interface Reporte {
  id: number;
  fecha: string;
  tipoEstafa: string;
  canal: string;
  descripcion: string;
  perdidaEconomica: boolean;
  monto: number | null;
  estado: 'Recibido' | 'En revisión' | 'Atendido';
}

export interface ResumenReportes {
  total: number;
  recibidos: number;
  enRevision: number;
  atendidos: number;
  conPerdidaEconomica: number;
  montoTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private reportes: Reporte[] = [
    {
      id: 1,
      fecha: '2023-10-26',
      tipoEstafa: 'Mensaje de WhatsApp',
      canal: 'WhatsApp',
      descripcion: 'Recibí un mensaje de un número desconocido que se hacía pasar por mi hijo pidiendo dinero urgente.',
      perdidaEconomica: false,
      monto: null,
      estado: 'Atendido'
    },
    {
      id: 2,
      fecha: '2023-11-15',
      tipoEstafa: 'Llamada telefónica falsa',
      canal: 'Llamada telefónica',
      descripcion: 'Me llamaron diciendo ser de mi banco y me pidieron mi clave de internet por un supuesto problema de seguridad.',
      perdidaEconomica: true,
      monto: 500,
      estado: 'En revisión'
    },
    {
      id: 3,
      fecha: '2023-12-01',
      tipoEstafa: 'Correo electrónico sospechoso',
      canal: 'Correo electrónico',
      descripcion: 'Recibí un correo de un supuesto sorteo de un televisor, pidiéndome mis datos personales para reclamar el premio.',
      perdidaEconomica: false,
      monto: null,
      estado: 'Recibido'
    }
  ];

  getReportes(): Reporte[] {
    return [...this.reportes].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  }

  agregarReporte(reporte: Omit<Reporte, 'id' | 'estado'>): void {
    const newId = this.reportes.length > 0
      ? Math.max(...this.reportes.map(r => r.id)) + 1
      : 1;

    const nuevoReporte: Reporte = {
      ...reporte,
      id: newId,
      estado: 'Recibido'
    };

    this.reportes.unshift(nuevoReporte);
  }

  getResumen(): ResumenReportes {
    const total = this.reportes.length;
    const recibidos = this.reportes.filter(r => r.estado === 'Recibido').length;
    const enRevision = this.reportes.filter(r => r.estado === 'En revisión').length;
    const atendidos = this.reportes.filter(r => r.estado === 'Atendido').length;
    const conPerdidaEconomica = this.reportes.filter(r => r.perdidaEconomica).length;
    const montoTotal = this.reportes.reduce((acc, r) => acc + (r.monto ?? 0), 0);

    return {
      total,
      recibidos,
      enRevision,
      atendidos,
      conPerdidaEconomica,
      montoTotal
    };
  }
}
