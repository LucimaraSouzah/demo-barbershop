import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

interface DashboardData {
  estatisticas: {
    agendamentosHoje: number;
    agendamentosSemana: number;
    agendamentosMes: number;
    mediaAvaliacao: number;
  };
  proximosAgendamentos: any[];
  feedbacksRecentes: any[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4 sm:space-y-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-primary dark:text-white">Dashboard</h1>

      <!-- Estatísticas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div class="card">
          <h3 class="text-sm text-gray-600 dark:text-gray-300 mb-2">Agendamentos Hoje</h3>
          <p class="text-3xl font-bold text-primary dark:text-white">{{ estatisticas?.agendamentosHoje || 0 }}</p>
        </div>
        <div class="card">
          <h3 class="text-sm text-gray-600 dark:text-gray-300 mb-2">Esta Semana</h3>
          <p class="text-3xl font-bold text-primary dark:text-white">{{ estatisticas?.agendamentosSemana || 0 }}</p>
        </div>
        <div class="card">
          <h3 class="text-sm text-gray-600 dark:text-gray-300 mb-2">Este Mês</h3>
          <p class="text-3xl font-bold text-primary dark:text-white">{{ estatisticas?.agendamentosMes || 0 }}</p>
        </div>
        <div class="card">
          <h3 class="text-sm text-gray-600 dark:text-gray-300 mb-2">Média Avaliação</h3>
          <p class="text-3xl font-bold text-secondary">{{ estatisticas?.mediaAvaliacao || 0 }}</p>
        </div>
      </div>

      <!-- Próximos Agendamentos -->
      <div class="card overflow-hidden">
        <h2 class="text-lg sm:text-xl font-semibold mb-4">Próximos Agendamentos</h2>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead>
              <tr class="border-b">
                <th class="text-left p-2">Cliente</th>
                <th class="text-left p-2">Serviço</th>
                <th class="text-left p-2">Data/Hora</th>
                <th class="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let agendamento of proximosAgendamentos" class="border-b">
                <td class="p-2">{{ agendamento.clienteNome }}</td>
                <td class="p-2">{{ agendamento.servicoNome }}</td>
                <td class="p-2">{{ formatarDataHora(agendamento.dataHora) }}</td>
                <td class="p-2">
                  <span class="px-2 py-1 rounded text-sm" [class.bg-yellow-100]="agendamento.status === 'Pendente'">
                    {{ agendamento.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Feedbacks Recentes -->
      <div class="card">
        <h2 class="text-lg sm:text-xl font-semibold mb-4">Feedbacks Recentes</h2>
        <div class="space-y-4">
          <div *ngFor="let feedback of feedbacksRecentes" class="border-b pb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">{{ feedback.nome }}</span>
              <div class="flex text-yellow-400">
                <span *ngFor="let i of [1,2,3,4,5]">
                  <svg *ngIf="i <= feedback.avaliacao" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </span>
              </div>
            </div>
            <p class="text-gray-600 text-sm">{{ feedback.comentario }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  estatisticas: any;
  proximosAgendamentos: any[] = [];
  feedbacksRecentes: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.apiService.get<DashboardData>('admin/dashboard').subscribe({
      next: (data) => {
        this.estatisticas = data.estatisticas;
        this.proximosAgendamentos = data.proximosAgendamentos;
        this.feedbacksRecentes = data.feedbacksRecentes;
      },
      error: (error) => {
        console.error('Erro ao carregar dashboard:', error);
      }
    });
  }

  formatarDataHora(dataHora: string): string {
    if (!dataHora) return '';
    
    try {
      if (dataHora.match(/^\d{1,2}\/\d{1,2}\/\d{4}/)) {
        const parts = dataHora.split(/\s*\//);
        if (parts.length >= 3) {
          const mes = parseInt(parts[0]);
          const dia = parseInt(parts[1]);
          const resto = parts[2].split(/\s+/);
          const ano = parseInt(resto[0]);
          
          let horas = 0;
          let minutos = 0;
          if (resto.length > 1) {
            const horaParts = resto[1].split(':');
            horas = parseInt(horaParts[0]) || 0;
            minutos = parseInt(horaParts[1]) || 0;
          }
          
          return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano} ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
        }
      }
      
      const date = new Date(dataHora);
      if (isNaN(date.getTime())) {
        return dataHora;
      }
      
      const dia = date.getUTCDate().toString().padStart(2, '0');
      const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const ano = date.getUTCFullYear();
      const horas = date.getUTCHours().toString().padStart(2, '0');
      const minutos = date.getUTCMinutes().toString().padStart(2, '0');
      
      return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    } catch (error) {
      return dataHora;
    }
  }
}

