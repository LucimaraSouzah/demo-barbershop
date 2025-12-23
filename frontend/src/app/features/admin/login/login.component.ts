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
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-primary">
          Painel Administrativo
        </h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              formControlName="email"
              class="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Senha</label>
            <input
              type="password"
              formControlName="senha"
              class="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div *ngIf="error" class="text-red-500 text-sm">
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

