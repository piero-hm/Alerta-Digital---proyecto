import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string = 'Juan Pérez'; // Ejemplo, deberías obtenerlo del servicio de autenticación

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}

