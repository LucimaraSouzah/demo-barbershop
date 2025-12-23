import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'agendamento',
    loadComponent: () => import('./features/agendamento/agendamento.component').then(m => m.AgendamentoComponent)
  },
  {
    path: 'feedbacks',
    loadComponent: () => import('./features/feedbacks/feedbacks.component').then(m => m.FeedbacksComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
