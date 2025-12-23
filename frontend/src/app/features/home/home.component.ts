import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { MetaPixelService } from '../../core/services/meta-pixel.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppButtonComponent } from '../../shared/components/whatsapp-button/whatsapp-button.component';

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  duracao: number;
  preco: number;
  imagemUrl?: string;
  ativo: boolean;
}

interface Feedback {
  id: number;
  nome: string;
  avaliacao: number;
  comentario: string;
  fotoUrl?: string;
  criadoEm: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, WhatsAppButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <!-- Header -->
      <app-header></app-header>

      <!-- Hero Section -->
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-charcoal-900/95 z-10"></div>
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        </div>

        <!-- Content -->
        <div class="relative z-20 container mx-auto px-4 py-16 md:py-32 text-center">
          <div class="max-w-4xl mx-auto animate-fade-in-up">
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white font-display leading-tight">
              <span class="gradient-text">Corte & Tradição</span>
            </h1>
            <p class="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6 text-white font-light px-2">
              Estilo e Tradição em Cada Corte
            </p>
            <p class="text-base sm:text-lg md:text-xl lg:text-xl mb-8 md:mb-10 text-gray-200 font-light max-w-2xl mx-auto px-4">
              Mais de 15 anos oferecendo serviços premium de barbearia. Profissionais experientes, 
              ambiente sofisticado e atenção aos detalhes em cada serviço.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <a routerLink="/agendamento" class="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 w-full sm:w-auto">
              Agendar Agora
            </a>
              <a href="#servicos" class="btn-outline text-white border-white hover:bg-white hover:text-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 w-full sm:w-auto">
                Nossos Serviços
              </a>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-float">
          <a href="#servicos" class="text-white/70 hover:text-white transition-colors">
            <svg class="w-6 h-6 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </a>
        </div>
      </section>

      <!-- Why Choose Us Section -->
      <section class="py-12 md:py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8 md:mb-16 animate-fade-in-up">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary dark:text-white font-display">
              Por Que Escolher <span class="gradient-text">Corte & Tradição?</span>
            </h2>
            <p class="text-base md:text-xl text-charcoal-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
              Tradição, qualidade e atenção aos detalhes em cada serviço
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div class="text-center p-6 md:p-8 card hover:shadow-elegant-lg animate-fade-in-up" style="animation-delay: 0.1s">
              <div class="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-secondary to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg class="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary dark:text-white font-display">Profissionais Experientes</h3>
              <p class="text-sm md:text-base text-charcoal-600 dark:text-gray-300 px-2">
                Nossa equipe possui anos de experiência e está sempre atualizada com as últimas tendências.
              </p>
            </div>

            <div class="text-center p-6 md:p-8 card hover:shadow-elegant-lg animate-fade-in-up" style="animation-delay: 0.2s">
              <div class="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-secondary to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg class="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary font-display">Agendamento Online</h3>
              <p class="text-sm md:text-base text-charcoal-600 px-2">
                Agende seu horário de forma rápida e prática, sem complicações ou esperas.
              </p>
            </div>

            <div class="text-center p-6 md:p-8 card hover:shadow-elegant-lg animate-fade-in-up sm:col-span-2 md:col-span-1" style="animation-delay: 0.3s">
              <div class="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-secondary to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg class="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 class="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary font-display">Qualidade Premium</h3>
              <p class="text-sm md:text-base text-charcoal-600 px-2">
                Utilizamos apenas produtos e equipamentos de alta qualidade para garantir o melhor resultado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Serviços Section -->
      <section id="servicos" class="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16 animate-fade-in-up">
            <h2 class="section-title">Nossos <span class="gradient-text">Serviços</span></h2>
            <p class="section-subtitle">
              Oferecemos uma gama completa de serviços para cuidar do seu visual
            </p>
          </div>

          <!-- Loading Skeleton -->
          <div *ngIf="carregandoServicos" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let i of [1,2,3,4,5,6]" class="card-service animate-pulse">
              <div class="h-64 bg-gray-300 rounded-t-xl"></div>
              <div class="p-6 space-y-3">
                <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                <div class="h-4 bg-gray-300 rounded w-full"></div>
                <div class="h-4 bg-gray-300 rounded w-2/3"></div>
                <div class="flex justify-between pt-4">
                  <div class="h-6 bg-gray-300 rounded w-20"></div>
                  <div class="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div *ngIf="erroCarregamento && !carregandoServicos" class="text-center py-12">
            <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p class="text-charcoal-600 dark:text-gray-300 mb-4">Não foi possível carregar os serviços.</p>
            <button (click)="carregarServicos()" class="btn-primary">
              Tentar Novamente
            </button>
          </div>

          <!-- Services Grid -->
          <div *ngIf="!carregandoServicos && !erroCarregamento" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let servico of servicos; let i = index"
              class="card-service animate-fade-in-up"
              [style.animation-delay]="(i * 0.1) + 's'"
              (click)="irParaAgendamento(servico.id)"
              [attr.aria-label]="'Agendar serviço ' + servico.nome + ' por R$ ' + servico.preco.toFixed(2)"
              role="button"
              tabindex="0"
              (keydown.enter)="irParaAgendamento(servico.id)"
              (keydown.space)="irParaAgendamento(servico.id); $event.preventDefault()"
            >
              <!-- Service Image -->
              <div class="relative h-64 bg-gradient-to-br from-charcoal-800 to-charcoal-900 overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <img
                  [src]="getServiceImage(servico)"
                  [alt]="'Imagem do serviço ' + servico.nome + ' - ' + servico.descricao"
                  class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  loading="lazy"
                  (error)="handleImageError($event)"
                  [style.display]="'block'"
                />
                <div class="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <h3 class="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 font-display">{{ servico.nome }}</h3>
                  <span class="text-secondary text-lg md:text-xl font-bold">R$ {{ servico.preco.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Service Content -->
              <div class="p-4 md:p-6">
                <p class="text-sm md:text-base text-charcoal-600 dark:text-gray-300 mb-4">{{ servico.descricao }}</p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span class="text-xs md:text-sm text-charcoal-500 dark:text-gray-400 flex items-center">
                    <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ servico.duracao }} min
                  </span>
                  <span class="text-secondary font-semibold hover:text-gold-600 transition-colors text-xs md:text-sm">
                    Agendar →
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feedbacks Section -->
      <section id="feedbacks" class="py-12 md:py-20 bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8 md:mb-16 animate-fade-in-up">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary dark:text-white font-display">
              O Que Nossos <span class="gradient-text">Clientes Dizem</span>
          </h2>
            <p class="text-base md:text-xl text-charcoal-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Feedbacks reais de quem confia no nosso trabalho
            </p>
            <div class="mt-4 md:mt-6">
              <a routerLink="/feedbacks" class="btn-outline text-secondary border-secondary hover:bg-secondary hover:text-primary text-sm md:text-base px-6 md:px-8 py-2 md:py-3">
                Ver Todos os Feedbacks
              </a>
            </div>
          </div>

          <!-- Loading Skeleton Feedbacks -->
          <div *ngIf="carregandoFeedbacks" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let i of [1,2,3]" class="card animate-pulse">
              <div class="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
              <div class="flex items-center pt-4 border-t">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div class="flex-1">
                  <div class="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div class="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Feedbacks Grid -->
          <div *ngIf="!carregandoFeedbacks && feedbacks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div
              *ngFor="let feedback of feedbacks; let i = index"
              class="card hover:shadow-elegant-lg animate-fade-in-up"
              [style.animation-delay]="(i * 0.1) + 's'"
            >
              <!-- Stars -->
              <div class="flex items-center mb-4">
                <div class="flex">
                  <span *ngFor="let j of [1,2,3,4,5]">
                    <svg
                      *ngIf="j <= feedback.avaliacao"
                      class="w-5 h-5"
                      style="fill: #fbbf24; color: #fbbf24;"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <svg
                      *ngIf="j > feedback.avaliacao"
                      class="w-5 h-5"
                      style="fill: #d1d5db; color: #d1d5db;"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Quote Icon -->
              <div class="mb-4">
                <svg class="w-10 h-10 text-secondary/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <!-- Feedback Text -->
              <p class="text-charcoal-700 dark:text-gray-200 mb-6 italic leading-relaxed">"{{ feedback.comentario }}"</p>

              <!-- Author -->
              <div class="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <div class="w-12 h-12 bg-gradient-to-br from-secondary to-gold-600 rounded-full flex items-center justify-center mr-4">
                  <span class="text-primary font-bold text-lg">{{ feedback.nome.charAt(0) }}</span>
                </div>
                <div>
                  <p class="font-semibold text-primary dark:text-white">{{ feedback.nome }}</p>
                  <p class="text-sm text-charcoal-500 dark:text-gray-400">Cliente Verificado</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State Feedbacks -->
          <div *ngIf="!carregandoFeedbacks && feedbacks.length === 0" class="text-center py-12">
            <p class="text-charcoal-600 dark:text-gray-300 text-lg">Ainda não há feedbacks publicados.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-12 md:py-20 bg-gradient-to-r from-primary via-charcoal-900 to-primary relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80'); background-size: cover; background-position: center;"></div>
        </div>
        <div class="relative z-10 container mx-auto px-4 text-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white font-display px-4">
            Pronto para um Novo Visual?
          </h2>
          <p class="text-base sm:text-lg md:text-xl mb-6 md:mb-10 text-gray-300 max-w-2xl mx-auto px-4">
            Agende seu horário agora na <strong class="text-secondary">Corte & Tradição</strong> e descubra por que somos a escolha preferida dos homens que valorizam estilo e qualidade.
          </p>
          <a routerLink="/agendamento" class="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4 inline-block">
            Agendar Agora
          </a>
        </div>
      </section>

      <!-- Localização e Mapa -->
      <section id="localizacao" class="py-12 md:py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="text-center mb-8 md:mb-16 animate-fade-in-up">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary dark:text-white font-display">
              Nossa <span class="gradient-text">Localização</span>
            </h2>
            <p class="text-base md:text-xl text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Venha nos visitar! Estamos prontos para recebê-lo com excelência e tradição.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <!-- Informações -->
            <div class="space-y-6 animate-fade-in-up">
              <div class="card p-6 md:p-8">
                <h3 class="text-2xl font-bold mb-6 text-primary font-display">Informações</h3>
                
                <!-- Endereço -->
                <div class="mb-6">
                  <div class="flex items-start space-x-3 mb-4">
                    <svg class="w-6 h-6 text-secondary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div>
                      <h4 class="font-semibold text-charcoal-900 dark:text-white mb-1">Endereço</h4>
                      <p class="text-charcoal-600 dark:text-gray-300">
                        Av. Afonso Pena, 1000<br>
                        Centro, Belo Horizonte - MG<br>
                        CEP: 30130-000
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Horários -->
                <div class="mb-6">
                  <div class="flex items-start space-x-3 mb-4">
                    <svg class="w-6 h-6 text-secondary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <h4 class="font-semibold text-charcoal-900 dark:text-white mb-1">Horários de Funcionamento</h4>
                      <div class="text-charcoal-600 dark:text-gray-300 space-y-1">
                        <p class="flex justify-between"><span>Segunda a Sexta:</span> <span class="font-medium">08:00 - 19:00</span></p>
                        <p class="flex justify-between"><span>Sábado:</span> <span class="font-medium">08:00 - 18:00</span></p>
                        <p class="flex justify-between"><span>Domingo:</span> <span class="font-medium text-red-600">Fechado</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contato -->
                <div class="mb-6">
                  <div class="flex items-start space-x-3 mb-4">
                    <svg class="w-6 h-6 text-secondary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <div>
                      <h4 class="font-semibold text-charcoal-900 dark:text-white mb-1">Contato</h4>
                      <div class="text-charcoal-600 dark:text-gray-300 space-y-2">
                        <p>
                          <a href="https://wa.me/5531995729646" target="_blank" rel="noopener noreferrer" class="hover:text-secondary transition-colors font-medium">
                            (31) 99572-9646
                          </a>
                        </p>
                        <p>
                          <a href="mailto:lucimarasouzah@gmail.com" class="hover:text-secondary transition-colors">
                            lucimarasouzah&#64;gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Destaques -->
                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <svg class="w-8 h-8 text-secondary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p class="text-sm font-semibold text-charcoal-900 dark:text-white">Agendamento</p>
                    <p class="text-xs text-charcoal-600 dark:text-gray-300">Online</p>
                  </div>
                  <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <svg class="w-8 h-8 text-secondary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-sm font-semibold text-charcoal-900 dark:text-white">Estacionamento</p>
                    <p class="text-xs text-charcoal-600 dark:text-gray-300">Gratuito</p>
                  </div>
                  <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <svg class="w-8 h-8 text-secondary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-sm font-semibold text-charcoal-900 dark:text-white">Wi-Fi</p>
                    <p class="text-xs text-charcoal-600 dark:text-gray-300">Grátis</p>
                  </div>
                  <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <svg class="w-8 h-8 text-secondary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    <p class="text-sm font-semibold text-charcoal-900 dark:text-white">Acessível</p>
                    <p class="text-xs text-charcoal-600 dark:text-gray-300">PCD</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mapa -->
            <div class="animate-fade-in-up" style="animation-delay: 0.2s">
              <div class="card p-0 overflow-hidden">
                <div class="relative w-full h-full" style="min-height: 500px;">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.981106123456!2d-43.9378!3d-19.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzAwLjEiUyA0M8KwNTYnMTYuMSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style="border:0; min-height: 500px;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Localização da Corte & Tradição Barbearia"
                  ></iframe>
                  <div class="absolute bottom-4 right-4">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=-19.9167,-43.9378"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-primary text-sm px-4 py-2 shadow-lg"
                    >
                      <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                      </svg>
                      Como Chegar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <app-footer></app-footer>

      <!-- WhatsApp Button -->
      <app-whatsapp-button 
        [phoneNumber]="whatsappNumber"
        [message]="'Olá! Fiquei interessado no site que vocês desenvolveram. Gostaria de saber mais informações sobre como ter um site profissional igual para o meu negócio. Podem me ajudar?'"
      ></app-whatsapp-button>

      <!-- Voltar ao Topo Button -->
      <button
        *ngIf="mostrarBotaoTopo"
        (click)="scrollToTop()"
        class="fixed bottom-24 right-4 md:right-8 z-40 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-gold-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        aria-label="Voltar ao topo"
        [style.opacity]="mostrarBotaoTopo ? '1' : '0'"
        [style.transform]="mostrarBotaoTopo ? 'translateY(0)' : 'translateY(20px)'"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    /* Service Image Placeholders */
    .card-service:hover img {
      transform: scale(1.1);
    }
  `]
})
export class HomeComponent implements OnInit {
  servicos: Servico[] = [];
  feedbacks: Feedback[] = [];
  whatsappNumber = '5531995729646'; // (31) 99572-9646
  carregandoServicos = true;
  carregandoFeedbacks = true;
  erroCarregamento = false;
  mostrarBotaoTopo = false;

  constructor(
    private apiService: ApiService,
    private metaPixel: MetaPixelService
  ) {}

  ngOnInit(): void {
    this.metaPixel.trackPageView();
    this.carregarServicos();
    this.carregarFeedbacks();
    
    // Listener para mostrar/ocultar botão voltar ao topo
    window.addEventListener('scroll', () => {
      this.mostrarBotaoTopo = window.scrollY > 400;
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  carregarServicos(): void {
    this.carregandoServicos = true;
    this.erroCarregamento = false;
    // Adicionar timestamp para evitar cache
    const timestamp = new Date().getTime();
    this.apiService.get<Servico[]>('servicos', { apenasAtivos: true, _t: timestamp }).subscribe({
      next: (data) => {
        this.servicos = data;
        this.carregandoServicos = false;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
        this.carregandoServicos = false;
        this.erroCarregamento = true;
      }
    });
  }

  carregarFeedbacks(): void {
    this.carregandoFeedbacks = true;
    this.apiService.get<Feedback[]>('feedbacks', { apenasAprovados: true }).subscribe({
      next: (data) => {
        this.feedbacks = data.slice(0, 6); // Limitar a 6 feedbacks
        this.carregandoFeedbacks = false;
      },
      error: (error) => {
        console.error('Erro ao carregar feedbacks:', error);
        this.carregandoFeedbacks = false;
      }
    });
  }

  irParaAgendamento(servicoId: number): void {
    const servico = this.servicos.find(s => s.id === servicoId);
    if (servico) {
      this.metaPixel.trackViewService(servico.id, servico.nome);
    }
    window.location.href = `/agendamento?servico=${servicoId}`;
  }

  handleImageError(event: any): void {
    // Se a imagem falhar ao carregar, mostra um placeholder com gradiente
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    if (parent) {
      parent.classList.add('bg-gradient-to-br', 'from-charcoal-700', 'to-charcoal-900');
    }
  }

  getServiceImage(servico: Servico): string {
    // PRIORIDADE 1: Se o serviço tem imagemUrl (upload ou URL), usar ela
    if (servico.imagemUrl && servico.imagemUrl.trim() !== '') {
      return servico.imagemUrl;
    }

    // PRIORIDADE 2: Mapear nomes dos serviços para imagens locais (assets/img)
    // Baseado nos arquivos existentes na pasta frontend/src/assets/img
    // Usando caminhos relativos para funcionar com base-href
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const localImages: { [key: string]: string } = {
      'Corte Masculino': `${baseHref}assets/img/corte-masculino.jpg`,
      'Barba': `${baseHref}assets/img/barba.png`,
      'Corte + Barba': `${baseHref}assets/img/barba-corte.jpg`,
      'Sobrancelha': `${baseHref}assets/img/sobrancelha.jpg`,
      'Pigmentação de Barba': `${baseHref}assets/img/pigmentacao-barba.png`
    };

    // Se tem imagem local, usa ela
    if (localImages[servico.nome]) {
      return localImages[servico.nome];
    }

    // PRIORIDADE 3: Fallback para imagens do Unsplash para serviços sem imagem local
    const unsplashImages: { [key: string]: string } = {
      // Relaxamento Capilar - tratamento capilar masculino
      'Relaxamento Capilar': 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=600&fit=crop&q=80&auto=format'
    };
    
    // Retorna imagem do Unsplash ou imagem padrão de barbearia
    return unsplashImages[servico.nome] || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop&q=80&auto=format';
  }
}
