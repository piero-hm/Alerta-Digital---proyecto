import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

// Definiciones de interfaces para los datos del dashboard
interface SystemStatus {
  modulesActive: string;
  recentAlerts: string;
  protectedUsers: string;
  region: string;
  version: string;
}

interface QuickStat {
  value: string;
  description: string;
  colorClass: string; // Para aplicar clases de color dinámicamente
  icon: string; // Material Symbols Outlined icon name
}

interface ModuleCard {
  id: number; // Añadido el ID para el routerLink
  icon: string; // Material Symbols Outlined icon name
  title: string;
  description: string;
  routerLink: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Usar el archivo CSS externo
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  chartImageUrl: string = '/assets/images/incidentes-chart.png'; // URL local para la imagen del gráfico

  systemStatus: SystemStatus = {
    modulesActive: '3/3',
    recentAlerts: '0',
    protectedUsers: '65,247',
    region: 'Junín, PE',
    version: 'v1.0.0'
  };

  quickStats: QuickStat[] = [
    { value: '42,000+', description: 'Denuncias por ciberdelitos en Perú.', colorClass: 'dashboard-text-tertiary-container', icon: 'warning' },
    { value: '65,247', description: 'Adultos mayores en Huancayo.', colorClass: 'dashboard-text-primary', icon: 'group' },
    { value: '67%', description: 'Ciberdelitos son fraude informático.', colorClass: 'dashboard-text-tertiary-fixed-dim', icon: 'pie_chart' },
    { value: '3 Módulos', description: 'Disponibles para protegerte.', colorClass: 'dashboard-text-secondary', icon: 'shield' },
  ];

  modules: ModuleCard[] = [
    {
      id: 1, // ID del módulo de educación
      icon: 'phishing',
      title: 'Prevención de Phishing',
      description: 'Aprende a identificar correos y mensajes de texto falsos que intentan robar tu información personal.',
      routerLink: '/educacion/modulo/1'
    },
    {
      id: 2, // ID del módulo de educación
      icon: 'password',
      title: 'Contraseñas Seguras',
      description: 'Técnicas sencillas para crear y recordar contraseñas fuertes que protejan tus cuentas bancarias.',
      routerLink: '/educacion/modulo/2'
    },
    {
      id: 3, // ID del módulo de educación
      icon: 'support_agent',
      title: 'Fraudes Telefónicos',
      description: 'Reconoce las llamadas engañosas y sabe cómo actuar cuando te piden dinero o datos con urgencia.',
      routerLink: '/educacion/modulo/3'
    }
  ];

  // Los datos de recentAlerts y quickTips no están en el nuevo HTML, así que los eliminaré o los mantendré si se planea usarlos en el futuro.
  // Por ahora, los dejaré comentados o vacíos si no se usan.
  // recentAlerts: Alerta[] = [];
  // quickTips: QuickTip[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUsuarioActual();
    if (currentUser) {
      this.userName = currentUser.nombre;
    } else {
      this.router.navigate(['/login']);
    }
  }
}