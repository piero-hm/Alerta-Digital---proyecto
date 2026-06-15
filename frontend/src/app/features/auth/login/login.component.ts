import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => (this.loading = false),
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.error?.detail || 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      },
    });
  }
}
