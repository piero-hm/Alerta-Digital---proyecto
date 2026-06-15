import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  apellido = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.nombre || !this.apellido || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son requeridos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;

    this.authService.register(this.nombre, this.apellido, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.detail || 'Error al registrarse. Intenta de nuevo.';
      },
    });
  }
}
