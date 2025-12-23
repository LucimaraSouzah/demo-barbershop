import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppButtonComponent } from '../../shared/components/whatsapp-button/whatsapp-button.component';

interface Feedback {
  id: number;
  nome: string;
  avaliacao: number;
  comentario: string;
  fotoUrl?: string;
  respostaAdmin?: string;
  criadoEm: string;
}

interface CreateFeedbackDto {
  nome: string;
  avaliacao: number;
  comentario: string;
  agendamentoId?: number;
  fotoUrl?: string;
}

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent, WhatsAppButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <app-header></app-header>

      <!-- Hero Section -->
      <section class="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-primary via-charcoal-900 to-primary text-white">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 font-display px-4">
            <span class="gradient-text">Feedbacks</span>
          </h1>
          <p class="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Sua opinião é muito importante para nós! Deixe seu feedback e ajude outros clientes a conhecerem nosso trabalho.
          </p>
        </div>
      </section>

      <!-- Formulário de Feedback -->
      <section class="py-12 md:py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto">
            <div class="card shadow-elegant-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-primary font-display">
                Deixe Seu Feedback
              </h2>

              <form (ngSubmit)="enviarFeedback()" #feedbackForm="ngForm">
                <!-- Nome -->
                <div class="mb-6">
                  <label for="nome" class="block text-sm font-semibold text-charcoal-700 mb-2">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    [(ngModel)]="novoFeedback.nome"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <!-- Avaliação -->
                <div class="mb-6">
                  <label class="block text-sm font-semibold text-charcoal-700 mb-3">
                    Sua Avaliação *
                  </label>
                  <div class="flex justify-center space-x-2 mb-2">
                    <button
                      type="button"
                      *ngFor="let i of [1,2,3,4,5]"
                      (click)="novoFeedback.avaliacao = i"
                      (mouseenter)="hoveredStar = i"
                      (mouseleave)="hoveredStar = 0"
                      class="transition-all transform hover:scale-125 cursor-pointer"
                    >
                      <svg
                        class="w-12 h-12 transition-colors"
                        [style.fill]="getStarColor(i)"
                        [style.color]="getStarColor(i)"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    </button>
                  </div>
                  <p class="text-sm text-center text-charcoal-500">
                    {{ getAvaliacaoTexto() }}
                  </p>
                </div>

                <!-- Comentário -->
                <div class="mb-6">
                  <label for="comentario" class="block text-sm font-semibold text-charcoal-700 mb-2">
                    Seu Depoimento *
                  </label>
                  <textarea
                    id="comentario"
                    name="comentario"
                    [(ngModel)]="novoFeedback.comentario"
                    required
                    rows="5"
                    maxlength="500"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                    placeholder="Conte sua experiência conosco na Corte & Tradição..."
                  ></textarea>
                  <p class="text-xs text-charcoal-500 mt-1 text-right">
                    {{ novoFeedback.comentario.length }}/500 caracteres
                  </p>
                </div>

                <!-- Mensagem de Sucesso/Erro -->
                <div *ngIf="mensagemSucesso" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-green-800 font-semibold">✓ {{ mensagemSucesso }}</p>
                </div>
                <div *ngIf="mensagemErro" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p class="text-red-800 font-semibold">✗ {{ mensagemErro }}</p>
                </div>

                <!-- Botão Submit -->
                <div class="text-center">
                  <button
                    type="submit"
                    [disabled]="enviando || feedbackForm.invalid || novoFeedback.avaliacao === 0"
                    class="btn-primary text-lg px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span *ngIf="!enviando">Enviar Feedback</span>
                    <span *ngIf="enviando" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Lista de Feedbacks -->
      <section class="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-primary dark:text-white font-display">
            <span class="gradient-text">Feedbacks</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let feedback of feedbacks"
              class="card hover:shadow-elegant-lg transition-all duration-300 animate-fade-in-up"
            >
              <!-- Stars -->
              <div class="flex items-center mb-4">
                <div class="flex">
                  <span *ngFor="let i of [1,2,3,4,5]">
                    <svg
                      *ngIf="i <= feedback.avaliacao"
                      class="w-5 h-5"
                      style="fill: #fbbf24; color: #fbbf24;"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <svg
                      *ngIf="i > feedback.avaliacao"
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
              <p class="text-charcoal-700 mb-6 italic leading-relaxed">"{{ feedback.comentario }}"</p>

              <!-- Author -->
              <div class="flex items-center pt-4 border-t border-gray-100">
                <div class="w-12 h-12 bg-gradient-to-br from-secondary to-gold-600 rounded-full flex items-center justify-center mr-4">
                  <span class="text-primary font-bold text-lg">{{ feedback.nome.charAt(0) }}</span>
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-primary">{{ feedback.nome }}</p>
                  <p class="text-sm text-charcoal-500">{{ formatarData(feedback.criadoEm) }}</p>
                </div>
              </div>

              <!-- Resposta Admin -->
              <div *ngIf="feedback.respostaAdmin" class="mt-4 pt-4 border-t border-gray-100">
                <p class="text-sm font-semibold text-secondary mb-2">Resposta da Barbearia:</p>
                <p class="text-sm text-charcoal-600 italic">{{ feedback.respostaAdmin }}</p>
              </div>
            </div>
          </div>

          <!-- Mensagem quando não há feedbacks -->
          <div *ngIf="feedbacks.length === 0" class="text-center py-12">
            <p class="text-charcoal-600 text-lg">Ainda não há feedbacks publicados.</p>
          </div>
        </div>
      </section>

      <app-footer></app-footer>
      <app-whatsapp-button 
        [phoneNumber]="whatsappNumber"
        [message]="'Olá! Fiquei interessado no site que vocês desenvolveram. Gostaria de saber mais informações sobre como ter um site profissional igual para o meu negócio. Podem me ajudar?'"
      ></app-whatsapp-button>
    </div>
  `,
  styles: []
})
export class FeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  whatsappNumber = '5531995729646'; // (31) 99572-9646
  enviando = false;
  mensagemSucesso = '';
  mensagemErro = '';
  hoveredStar = 0; // Estrela sobre a qual o mouse está passando

  novoFeedback: CreateFeedbackDto = {
    nome: '',
    avaliacao: 0,
    comentario: '',
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Scroll para o topo quando entrar na página
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.carregarFeedbacks();
  }

  carregarFeedbacks(): void {
    this.apiService.get<Feedback[]>('feedbacks', { apenasAprovados: true }).subscribe({
      next: (data) => {
        this.feedbacks = data;
      },
      error: (error) => {
        console.error('Erro ao carregar feedbacks:', error);
      }
    });
  }

  enviarFeedback(): void {
    if (!this.novoFeedback.nome || !this.novoFeedback.comentario || this.novoFeedback.avaliacao === 0) {
      return;
    }

    this.enviando = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    this.apiService.post<Feedback>('feedbacks', this.novoFeedback).subscribe({
      next: (feedback) => {
        this.mensagemSucesso = 'Obrigado pelo seu feedback! Ele será analisado e publicado em breve.';
        // Limpar formulário
        this.novoFeedback = {
          nome: '',
          avaliacao: 0,
          comentario: '',
        };
        this.enviando = false;

        // Scroll suave para o topo após 2 segundos
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao enviar feedback:', error);
        this.mensagemErro = 'Erro ao enviar depoimento. Tente novamente.';
        this.enviando = false;
      }
    });
  }

  getAvaliacaoTexto(): string {
    switch (this.novoFeedback.avaliacao) {
      case 1: return 'Péssimo';
      case 2: return 'Ruim';
      case 3: return 'Regular';
      case 4: return 'Bom';
      case 5: return 'Excelente';
      default: return 'Selecione uma avaliação';
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getStarColor(starIndex: number): string {
    // Se tem uma estrela sendo hovered, mostra amarelo até ela
    if (this.hoveredStar > 0) {
      return starIndex <= this.hoveredStar ? '#fbbf24' : '#d1d5db';
    }
    // Senão, mostra baseado na avaliação selecionada
    return starIndex <= this.novoFeedback.avaliacao ? '#fbbf24' : '#d1d5db';
  }
}
