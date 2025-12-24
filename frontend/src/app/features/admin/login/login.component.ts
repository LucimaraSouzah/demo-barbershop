import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
        <h1 class="text-3xl font-bold text-center mb-8 text-primary dark:text-white">
          Painel Administrativo
        </h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2 text-charcoal-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 text-charcoal-700 dark:text-gray-200">Senha</label>
            <input
              type="password"
              formControlName="senha"
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary"
              required
            />
          </div>
          <div *ngIf="error" class="text-red-600 dark:text-red-400 text-sm">
            {{ error }}
          </div>
          <button
            type="submit"
            class="btn-primary w-full"
            [disabled]="loginForm.invalid || loading"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.error = 'Email ou senha inválidos';
        this.loading = false;
      }
    });
  }
}

