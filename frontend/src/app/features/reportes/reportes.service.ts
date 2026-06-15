import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Reporte {
  id: number;
  usuario_id: number;
  tipo_fraude: string;
  descripcion: string;
  medio: string | null;
  monto_afectado: number | null;
  estado: string;
  creado_en: string;
}

export interface ReporteCrear {
  tipo_fraude: string;
  descripcion: string;
  medio: string | null;
  monto_afectado: number | null;
}

const API_URL = `${environment.apiUrl}/api/reportes`;

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  getReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(API_URL);
  }

  crearReporte(data: ReporteCrear): Observable<Reporte> {
    return this.http.post<Reporte>(API_URL, data);
  }
}
