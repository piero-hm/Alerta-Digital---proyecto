import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Usuario {
  email: string;
  password: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private usuarios: Usuario[] = [
    { email: 'admin@ciberseguro.pe', password: '123456', nombre: 'Administrador' },
    { email: 'usuario@test.pe', password: '123456', nombre: 'Juan Pérez' }
  ];
  private usuarioActual: Usuario | null = null;

  constructor(private router: Router) {
    // Check if a user is already logged in (e.g., from a previous session, though not using localStorage as per instructions)
    // For now, we'll assume no persistent login without localStorage.
  }

  login(email: string, password: string): boolean {
    const user = this.usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      this.isLoggedIn = true;
      this.usuarioActual = user;
      this.router.navigate(['/dashboard']);
      return true;
    }
    this.isLoggedIn = false;
    this.usuarioActual = null;
    return false;
  }

  register(nombre: string, email: string, password: string): void {
    // Basic validation: check if email already exists
    if (this.usuarios.some(u => u.email === email)) {
      console.error('El email ya está registrado.');
      // In a real app, you'd handle this with a proper error message to the user
      return;
    }
    this.usuarios.push({ nombre, email, password });
    console.log('Usuario registrado:', { nombre, email });
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.usuarioActual = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }
}
