import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { EducacionComponent } from './features/educacion/educacion.component';
import { ModuloDetalleComponent } from './features/educacion/pages/modulo-detalle/modulo-detalle.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Protected routes
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'educacion',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EducacionComponent }, // Lista principal de módulos
      { path: 'modulo/:id', component: ModuloDetalleComponent } // Vista de detalle
    ]
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz.component').then(m => m.QuizComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'reportes',
    loadComponent: () => import('./features/reportes/reportes.component').then(m => m.ReportesComponent),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page or redirect to login
];
