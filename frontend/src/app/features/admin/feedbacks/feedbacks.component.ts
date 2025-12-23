import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

interface Feedback {
  id: number;
  nome: string;
  avaliacao: number;
  comentario: string;
  fotoUrl?: string;
  aprovado: boolean;
  respostaAdmin?: string;
  criadoEm: string;
}

@Component({
  selector: 'app-admin-feedbacks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-4 sm:space-y-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-primary dark:text-white">Feedbacks</h1>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[700px]">
          <thead>
            <tr class="border-b">
              <th class="text-left p-2">Nome</th>
              <th class="text-left p-2">Avaliação</th>
              <th class="text-left p-2">Comentário</th>
              <th class="text-left p-2">Status</th>
              <th class="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let feedback of feedbacks" class="border-b">
              <td class="p-2">{{ feedback.nome }}</td>
              <td class="p-2">
                <div class="flex text-yellow-400">
                  <span *ngFor="let i of [1,2,3,4,5]">
                    <svg *ngIf="i <= feedback.avaliacao" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  </span>
                </div>
              </td>
              <td class="p-2">{{ feedback.comentario.substring(0, 50) }}...</td>
              <td class="p-2">
                <span [class.text-green-600]="feedback.aprovado" [class.text-red-600]="!feedback.aprovado">
                  {{ feedback.aprovado ? 'Aprovado' : 'Pendente' }}
                </span>
              </td>
              <td class="p-2">
                <button (click)="editar(feedback)" class="text-blue-600 mr-2">Editar</button>
                <button (click)="excluir(feedback.id)" class="text-red-600">Excluir</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->
      <div *ngIf="mostrarModal && feedbackEditando" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div class="bg-gray-100 rounded-lg p-4 sm:p-6 max-w-md w-full max-h-[95vh] overflow-y-auto dark:bg-gray-900">
          <h2 class="text-2xl font-bold mb-4">Editar Feedback</h2>
          <form [formGroup]="formulario" (ngSubmit)="salvar()" class="space-y-4">
            <div>
              <p class="font-semibold">{{ feedbackEditando.nome }}</p>
              <p class="text-gray-600 text-sm mb-2">{{ feedbackEditando.comentario }}</p>
            </div>
            <div>
              <label class="flex items-center">
                <input type="checkbox" formControlName="aprovado" class="mr-2" />
                Aprovado para exibição pública
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Resposta (opcional)</label>
              <textarea formControlName="respostaAdmin" rows="3" class="w-full p-2 border rounded-lg"></textarea>
            </div>
            <div class="flex gap-4">
              <button type="button" (click)="fecharModal()" class="btn-secondary flex-1">Cancelar</button>
              <button type="submit" class="btn-primary flex-1">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class FeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  mostrarModal = false;
  feedbackEditando?: Feedback;
  formulario: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      aprovado: [false],
      respostaAdmin: ['']
    });
  }

  ngOnInit(): void {
    this.carregarFeedbacks();
  }

  carregarFeedbacks(): void {
    this.apiService.get<Feedback[]>('feedbacks').subscribe({
      next: (data) => {
        this.feedbacks = data;
      },
      error: (error) => {
        console.error('Erro ao carregar feedbacks:', error);
      }
    });
  }

  editar(feedback: Feedback): void {
    this.feedbackEditando = feedback;
    this.formulario.patchValue({
      aprovado: feedback.aprovado,
      respostaAdmin: feedback.respostaAdmin || ''
    });
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.feedbackEditando = undefined;
  }

  salvar(): void {
    if (!this.feedbackEditando) return;

    const dados = this.formulario.value;

    this.apiService.put(`feedbacks/${this.feedbackEditando.id}`, dados).subscribe({
      next: () => {
        this.carregarFeedbacks();
        this.fecharModal();
      },
      error: (error) => {
        console.error('Erro ao atualizar feedback:', error);
        alert('Erro ao salvar feedback');
      }
    });
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este feedback?')) return;

    this.apiService.delete(`feedbacks/${id}`).subscribe({
      next: () => {
        this.carregarFeedbacks();
      },
      error: (error) => {
        console.error('Erro ao excluir feedback:', error);
        alert('Erro ao excluir feedback');
      }
    });
  }
}

