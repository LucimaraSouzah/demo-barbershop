import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

interface Agendamento {
  id: number;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail?: string;
  servicoId: number;
  servicoNome: string;
  dataHora: string;
  status: string;
  observacoes?: string;
}

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4 sm:space-y-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-primary dark:text-white">Agendamentos</h1>

      <div class="card overflow-hidden">
        <div class="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="date"
            [(ngModel)]="dataFiltro"
            (change)="carregarAgendamentos()"
            class="p-2 border rounded-lg flex-1"
          />
          <select [(ngModel)]="statusFiltro" (change)="carregarAgendamentos()" class="p-2 border rounded-lg flex-1 sm:flex-initial sm:w-auto">
            <option value="">Todos os Status</option>
            <option value="1">Pendente</option>
            <option value="2">Confirmado</option>
            <option value="3">Concluído</option>
            <option value="4">Cancelado</option>
          </select>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px]">
          <thead>
            <tr class="border-b">
              <th class="text-left p-2">Cliente</th>
              <th class="text-left p-2">Telefone</th>
              <th class="text-left p-2">Serviço</th>
              <th class="text-left p-2">Data/Hora</th>
              <th class="text-left p-2">Status</th>
              <th class="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let agendamento of agendamentos" class="border-b">
              <td class="p-2">{{ agendamento.clienteNome }}</td>
              <td class="p-2">{{ agendamento.clienteTelefone }}</td>
              <td class="p-2">{{ agendamento.servicoNome }}</td>
              <td class="p-2">{{ formatarDataHora(agendamento.dataHora) }}</td>
              <td class="p-2">
                <select
                  [value]="agendamento.status"
                  (change)="atualizarStatus(agendamento.id, $event)"
                  class="p-1 border rounded"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Concluido">Concluído</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </td>
              <td class="p-2">
                <button (click)="excluir(agendamento.id)" class="text-red-600">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class AgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  dataFiltro = '';
  statusFiltro = '';

  constructor(private apiService: ApiService) {
    const hoje = new Date();
    this.dataFiltro = hoje.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    const params: any = {};
    if (this.dataFiltro) {
      const data = new Date(this.dataFiltro);
      params.dataInicio = data.toISOString();
      const fim = new Date(data);
      fim.setDate(fim.getDate() + 1);
      params.dataFim = fim.toISOString();
    }
    if (this.statusFiltro) {
      params.status = parseInt(this.statusFiltro);
    }

    this.apiService.get<Agendamento[]>('agendamentos', params).subscribe({
      next: (data) => {
        this.agendamentos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar agendamentos:', error);
      }
    });
  }

  atualizarStatus(id: number, event: any): void {
    const status = event.target.value;
    const statusMap: any = {
      'Pendente': 1,
      'Confirmado': 2,
      'Concluido': 3,
      'Cancelado': 4
    };

    this.apiService.get<Agendamento>(`agendamentos/${id}`).subscribe({
      next: (agendamento) => {
        const update = {
          clienteNome: agendamento.clienteNome,
          clienteTelefone: agendamento.clienteTelefone,
          clienteEmail: agendamento.clienteEmail,
          servicoId: agendamento.servicoId,
          dataHora: agendamento.dataHora,
          status: statusMap[status],
          observacoes: agendamento.observacoes
        };

        this.apiService.put(`agendamentos/${id}`, update).subscribe({
          next: () => {
            this.carregarAgendamentos();
          },
          error: (error) => {
            console.error('Erro ao atualizar status:', error);
            alert('Erro ao atualizar status');
          }
        });
      }
    });
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;

    this.apiService.delete(`agendamentos/${id}`).subscribe({
      next: () => {
        this.carregarAgendamentos();
      },
      error: (error) => {
        console.error('Erro ao excluir agendamento:', error);
        alert('Erro ao excluir agendamento');
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

