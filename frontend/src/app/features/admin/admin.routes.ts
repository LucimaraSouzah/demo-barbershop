import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'servicos',
        loadComponent: () => import('./servicos/servicos.component').then(m => m.ServicosComponent)
      },
      {
        path: 'agendamentos',
        loadComponent: () => import('./agendamentos/agendamentos.component').then(m => m.AgendamentosComponent)
      },
      {
        path: 'feedbacks',
        loadComponent: () => import('./feedbacks/feedbacks.component').then(m => m.FeedbacksComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

