import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: [`
    @keyframes pulse-online {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .navbar {
      background-color: #0a0f1a;
      border-bottom: 1px solid #00d4ff;
      box-shadow: 0 2px 20px rgba(0, 212, 255, 0.15);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 1030; /* Ensure it stays on top */
    }

    .navbar-brand {
      font-family: 'Courier New', monospace;
      font-size: 1.1rem;
      letter-spacing: 2px;
      color: #00d4ff !important;
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .navbar-brand .shield-icon {
      margin-right: 5px;
      color: #00d4ff;
    }

    .navbar-brand .subtitle {
      font-size: 0.6rem;
      color: #00d4ff;
      margin-left: 5px;
      line-height: 1;
    }

    .navbar-nav .nav-link {
      color: #a8b2c1;
      font-weight: 500;
      position: relative;
      padding: 0.5rem 1rem;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .navbar-nav .nav-link:hover,
    .navbar-nav .nav-link.active-link {
      color: #ffffff;
    }

    .navbar-nav .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #00d4ff;
      transition: width 0.3s ease-out;
    }

    .navbar-nav .nav-link:hover::after,
    .navbar-nav .nav-link.active-link::after {
      width: 100%;
    }

    .online-indicator {
      color: #00ff00; /* Green dot */
      animation: pulse-online 1.5s infinite;
      margin-right: 5px;
    }

    .user-info {
      color: #a8b2c1;
      display: flex;
      align-items: center;
    }

    .logout-btn {
      border: 1px solid #00d4ff;
      color: #00d4ff;
      background-color: transparent;
      transition: background-color 0.3s ease, color 0.3s ease;
      margin-left: 15px;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      text-decoration: none;
    }

    .logout-btn:hover {
      background-color: #00d4ff;
      color: #0a0f1a;
    }

    .navbar-toggler {
      border-color: #00d4ff;
    }

    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 212, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    .navbar-collapse.show {
      background-color: #0d1321;
      padding: 1rem;
      border-radius: 0.25rem;
      margin-top: 0.5rem;
    }

    @media (max-width: 991.98px) {
      .navbar-nav {
        text-align: center;
      }
      .navbar-nav .nav-link::after {
        left: 50%;
        transform: translateX(-50%);
      }
      .navbar-nav .nav-link {
        padding: 0.75rem 0;
      }
      .user-info {
        justify-content: center;
        margin-top: 1rem;
      }
      .logout-btn {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUsuarioActual();
    if (currentUser) {
      this.userName = currentUser.nombre;
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
