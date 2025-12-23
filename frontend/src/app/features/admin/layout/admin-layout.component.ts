import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <!-- Header -->
      <nav class="bg-primary text-white shadow-lg">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center gap-4">
              <!-- Menu Hamburger (Mobile) -->
              <button 
                (click)="toggleSidebar()" 
                class="lg:hidden text-white hover:text-gray-200 transition-colors"
                aria-label="Toggle menu"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path *ngIf="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  <path *ngIf="sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <h1 class="text-lg sm:text-xl font-bold">Painel Admin</h1>
            </div>
            <div class="flex items-center gap-2 sm:gap-4">
              <app-theme-toggle></app-theme-toggle>
              <span *ngIf="currentUser" class="text-sm sm:text-base hidden sm:inline">{{ currentUser.nome }}</span>
              <button (click)="logout()" class="btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div class="flex gap-4 sm:gap-8">
          <!-- Overlay para mobile (fora do sidebar para não interferir) -->
          <div 
            *ngIf="sidebarOpen" 
            class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            (click)="toggleSidebar()"
            style="top: 73px;"
          ></div>

          <!-- Sidebar -->
          <aside 
            class="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg lg:shadow p-4 transform transition-transform duration-300 ease-in-out"
            [class.translate-x-0]="sidebarOpen"
            [class.-translate-x-full]="!sidebarOpen"
            [class.lg:translate-x-0]="true"
            style="top: 73px;"
          >
            <nav class="space-y-2 relative z-50">
              <a
                routerLink="/admin/dashboard"
                routerLinkActive="bg-secondary text-primary"
                (click)="closeSidebarOnMobile()"
                class="block p-2 sm:p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base cursor-pointer text-charcoal-700 dark:text-white"
              >
                Dashboard
              </a>
              <a
                routerLink="/admin/servicos"
                routerLinkActive="bg-secondary text-primary"
                (click)="closeSidebarOnMobile()"
                class="block p-2 sm:p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base cursor-pointer text-charcoal-700 dark:text-white"
              >
                Serviços
              </a>
              <a
                routerLink="/admin/agendamentos"
                routerLinkActive="bg-secondary text-primary"
                (click)="closeSidebarOnMobile()"
                class="block p-2 sm:p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base cursor-pointer text-charcoal-700 dark:text-white"
              >
                Agendamentos
              </a>
              <a
                routerLink="/admin/feedbacks"
                routerLinkActive="bg-secondary text-primary"
                (click)="closeSidebarOnMobile()"
                class="block p-2 sm:p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base cursor-pointer text-charcoal-700 dark:text-white"
              >
                Feedbacks
              </a>
            </nav>
          </aside>

          <!-- Main Content -->
          <main class="flex-1 w-full lg:w-auto min-w-0">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  currentUser = this.authService.getCurrentUser();
  sidebarOpen = true; // Inicia aberto, será ajustado no ngOnInit

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    // Cleanup se necessário
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      // Em desktop (lg: 1024px+), sidebar sempre aberto
      if (window.innerWidth >= 1024) {
        this.sidebarOpen = true;
      }
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile(): void {
    // Fechar sidebar em mobile quando clicar em um link
    // Usar setTimeout para garantir que a navegação aconteça primeiro
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        this.sidebarOpen = false;
      }
    }, 100);
  }

  logout(): void {
    this.authService.logout();
  }
}

