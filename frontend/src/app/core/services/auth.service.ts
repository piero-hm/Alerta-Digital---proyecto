import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UsuarioRespuesta {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  es_admin: boolean;
  creado_en: string;
}

export interface TokenRespuesta {
  access_token: string;
  token_type: string;
  usuario: UsuarioRespuesta;
}

const API_URL = `${environment.apiUrl}/api/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSignal = signal<string | null>(localStorage.getItem('jwt_token'));
  private usuarioSignal = signal<UsuarioRespuesta | null>(null);

  usuarioActual = this.usuarioSignal.asReadonly();
  isAuthenticated = computed(() => this.tokenSignal() !== null);
  esAdmin = computed(() => this.usuarioSignal()?.es_admin ?? false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.tokenSignal()) {
      this.cargarUsuario();
    }
  }

  private guardarToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    this.tokenSignal.set(token);
  }

  obtenerToken(): string | null {
    return this.tokenSignal();
  }

  private limpiarSesion(): void {
    localStorage.removeItem('jwt_token');
    this.tokenSignal.set(null);
    this.usuarioSignal.set(null);
  }

  private cargarUsuario(): void {
    this.http.get<UsuarioRespuesta>(`${API_URL}/me`).subscribe({
      next: (user) => this.usuarioSignal.set(user),
      error: () => this.limpiarSesion(),
    });
  }

  login(email: string, password: string): Observable<TokenRespuesta> {
    return this.http
      .post<TokenRespuesta>(`${API_URL}/login`, { email, password })
      .pipe(
        tap((res) => {
          this.guardarToken(res.access_token);
          this.usuarioSignal.set(res.usuario);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  register(
    nombre: string,
    apellido: string,
    email: string,
    password: string
  ): Observable<UsuarioRespuesta> {
    return this.http
      .post<UsuarioRespuesta>(`${API_URL}/register`, {
        nombre,
        apellido,
        email,
        password,
      })
      .pipe(
        tap(() => this.router.navigate(['/login']))
      );
  }

  logout(): void {
    this.limpiarSesion();
    this.router.navigate(['/login']);
  }
}
