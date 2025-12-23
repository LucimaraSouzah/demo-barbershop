import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-md transition-all duration-300" [class.shadow-lg]="scrolled" [class.shadow-md]="!scrolled">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center space-x-2 group" aria-label="Ir para página inicial - Corte & Tradição">
            <div class="w-10 h-10 bg-gradient-to-br from-secondary to-gold-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-xl sm:text-2xl font-bold gradient-text font-display">Corte & Tradição</span>
          </a>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-4">
            <a routerLink="/" routerLinkActive="text-secondary" [routerLinkActiveOptions]="{exact: true}" class="text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded px-2 py-1">
              Início
            </a>
            <a (click)="scrollTo('servicos')" class="text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded px-2 py-1">
              Serviços
            </a>
            <a routerLink="/feedbacks" routerLinkActive="text-secondary" class="text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded px-2 py-1">
              Feedbacks
            </a>
            <a (click)="scrollTo('localizacao')" class="text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded px-2 py-1">
              Localização
            </a>
            <a routerLink="/agendamento" class="btn-primary">
              Agendar
            </a>
            <app-theme-toggle></app-theme-toggle>
          </div>

          <!-- Mobile Menu Actions -->
          <div class="md:hidden flex items-center space-x-2">
            <app-theme-toggle></app-theme-toggle>
          <button 
            class="text-charcoal-700 dark:text-white hover:text-secondary transition-colors"
            (click)="toggleMenu()"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path *ngIf="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path *ngIf="menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="menuOpen" class="md:hidden mt-4 pb-4 space-y-4 animate-fade-in-down">
          <a routerLink="/" (click)="toggleMenu()" class="block text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium">
            Início
          </a>
          <a (click)="scrollTo('servicos'); toggleMenu()" class="block text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium cursor-pointer">
            Serviços
          </a>
          <a routerLink="/feedbacks" (click)="toggleMenu()" class="block text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium">
            Feedbacks
          </a>
          <a (click)="scrollTo('localizacao'); toggleMenu()" class="block text-charcoal-700 dark:text-white hover:text-secondary transition-colors font-medium cursor-pointer">
            Localização
          </a>
          <a routerLink="/agendamento" (click)="toggleMenu()" class="btn-primary inline-block">
            Agendar
          </a>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = false;
  scrolled = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll = (): void => {
    this.scrolled = window.scrollY > 10;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(elementId: string): void {
    // Se estiver em outra rota, navegar para home primeiro
    if (window.location.pathname !== '/') {
      this.router.navigate(['/'], { fragment: elementId });
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    this.menuOpen = false;
  }
}

