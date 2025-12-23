import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { MetaPixelService } from '../../core/services/meta-pixel.service';
import { WhatsAppButtonComponent } from '../../shared/components/whatsapp-button/whatsapp-button.component';

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  duracao: number;
  preco: number;
}

interface HorarioDisponivel {
  dataHora: string;
  disponivel: boolean;
}

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WhatsAppButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
          Agendar Horário
        </h1>

        <div class="card">
          <!-- Step 1: Selecionar Serviço -->
          <div *ngIf="step === 1" class="space-y-6">
            <h2 class="text-2xl font-semibold mb-4">1. Escolha o Serviço</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                *ngFor="let servico of servicos"
                class="border-2 rounded-lg p-4 cursor-pointer transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                [class.border-secondary]="servicoSelecionado?.id === servico.id"
                [class.bg-yellow-50]="servicoSelecionado?.id === servico.id"
                [class.dark:bg-gray-600]="servicoSelecionado?.id === servico.id"
                (click)="selecionarServico(servico)"
              >
                <h3 class="font-bold text-lg">{{ servico.nome }}</h3>
                <p class="text-gray-600 text-sm mb-2">{{ servico.descricao }}</p>
                <div class="flex justify-between">
                  <span class="font-bold text-secondary">R$ {{ servico.preco.toFixed(2) }}</span>
                  <span class="text-sm text-gray-500">{{ servico.duracao }} min</span>
                </div>
              </div>
            </div>
            <button
              *ngIf="servicoSelecionado"
              (click)="proximoPasso()"
              class="btn-primary w-full"
            >
              Próximo
            </button>
          </div>

          <!-- Step 2: Selecionar Data/Hora -->
          <div *ngIf="step === 2" class="space-y-6">
            <h2 class="text-2xl font-semibold mb-4">2. Escolha Data e Horário</h2>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Data</label>
              <input
                type="date"
                [(ngModel)]="dataSelecionada"
                [min]="dataMinima"
                (change)="carregarHorarios()"
                class="w-full p-2 border rounded-lg"
              />
            </div>
            <div *ngIf="horarios.length > 0">
              <label class="block text-sm font-medium mb-2">Horário</label>
              <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
                <button
                  *ngFor="let horario of horarios"
                  [disabled]="!horario.disponivel"
                  [class.bg-secondary]="horarioSelecionado === horario.dataHora"
                  [class.text-primary]="horarioSelecionado === horario.dataHora"
                  [class.opacity-50]="!horario.disponivel"
                  [class.cursor-not-allowed]="!horario.disponivel"
                  (click)="selecionarHorario(horario.dataHora)"
                  class="p-2 border rounded hover:bg-gray-100 transition"
                >
                  {{ formatarHora(horario.dataHora) }}
                </button>
              </div>
            </div>
            <div class="flex gap-4">
              <button (click)="voltarPasso()" class="btn-secondary flex-1">Voltar</button>
              <button
                *ngIf="horarioSelecionado"
                (click)="proximoPasso()"
                class="btn-primary flex-1"
              >
                Próximo
              </button>
            </div>
          </div>

          <!-- Step 3: Dados do Cliente -->
          <div *ngIf="step === 3">
            <h2 class="text-2xl font-semibold mb-4">3. Seus Dados</h2>
            <form [formGroup]="formulario" (ngSubmit)="confirmarAgendamento()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Nome *</label>
                <input
                  type="text"
                  formControlName="nome"
                  class="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Telefone *</label>
                <input
                  type="tel"
                  formControlName="telefone"
                  class="w-full p-2 border rounded-lg"
                  placeholder="(11) 99999-9999"
                  maxlength="15"
                  (input)="aplicarMascaraTelefone($event)"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email (opcional)</label>
                <input
                  type="email"
                  formControlName="email"
                  class="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Observações</label>
                <textarea
                  formControlName="observacoes"
                  rows="3"
                  class="w-full p-2 border rounded-lg"
                ></textarea>
              </div>
              <div class="flex gap-4">
                <button type="button" (click)="voltarPasso()" class="btn-secondary flex-1">
                  Voltar
                </button>
                <button type="submit" class="btn-primary flex-1" [disabled]="formulario.invalid">
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>

          <!-- Step 4: Confirmação -->
          <div *ngIf="step === 4" class="text-center space-y-6">
            <div class="text-6xl mb-4">✅</div>
            <h2 class="text-2xl font-semibold text-success">Agendamento Confirmado!</h2>
            <div class="bg-gray-50 rounded-lg p-6 space-y-4">
              <p class="text-gray-700 text-lg">
                <strong>Obrigado pelo seu interesse!</strong>
              </p>
              <p class="text-gray-600">
                Este é um site demonstrativo desenvolvido como projeto de portfolio.
              </p>
              <p class="text-gray-600">
                Gostou do que viu? Entre em contato conosco para criar um site profissional igual para seu negócio!
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a 
                  href="https://wa.me/5531995729646?text=Olá! Vi o site da barbearia e fiquei interessado. Gostaria de saber mais sobre os serviços e como ter um site profissional igual. Podem me ajudar?"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Falar no WhatsApp
                </a>
                <a 
                  href="mailto:lucimarasouzah@gmail.com?subject=Interesse em Site Profissional"
                  class="btn-outline border-secondary text-secondary hover:bg-secondary hover:text-primary inline-flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Enviar Email
                </a>
              </div>
            </div>
            <button (click)="novoAgendamento()" class="btn-secondary">
              Ver Mais Serviços
            </button>
          </div>
        </div>
      </div>

      <app-whatsapp-button 
        [phoneNumber]="whatsappNumber"
        [message]="'Olá! Fiquei interessado no site que vocês desenvolveram. Gostaria de saber mais informações sobre como ter um site profissional igual para o meu negócio. Podem me ajudar?'"
      ></app-whatsapp-button>
    </div>
  `,
  styles: []
})
export class AgendamentoComponent implements OnInit {
  step = 1;
  servicos: Servico[] = [];
  servicoSelecionado?: Servico;
  dataSelecionada = '';
  dataMinima = '';
  horarios: HorarioDisponivel[] = [];
  horarioSelecionado = '';
  formulario: FormGroup;
  whatsappNumber = '5531995729646'; // (31) 99572-9646

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private metaPixel: MetaPixelService
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: [''],
      observacoes: ['']
    });

    const hoje = new Date();
    this.dataMinima = hoje.toISOString().split('T')[0];
    this.dataSelecionada = this.dataMinima;
  }

  ngOnInit(): void {
    this.carregarServicos();
    
    // Verificar se há serviço pré-selecionado na URL
    this.route.queryParams.subscribe(params => {
      if (params['servico']) {
        const servicoId = parseInt(params['servico']);
        this.apiService.get<Servico>(`servicos/${servicoId}`).subscribe({
          next: (servico) => {
            this.selecionarServico(servico);
            this.proximoPasso();
          }
        });
      }
    });
  }

  carregarServicos(): void {
    this.apiService.get<Servico[]>('servicos', { apenasAtivos: true }).subscribe({
      next: (data) => {
        this.servicos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
      }
    });
  }

  selecionarServico(servico: Servico): void {
    this.servicoSelecionado = servico;
  }

  proximoPasso(): void {
    if (this.step < 4) {
      this.step++;
      if (this.step === 2) {
        this.carregarHorarios();
      }
    }
  }

  voltarPasso(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  carregarHorarios(): void {
    if (!this.servicoSelecionado || !this.dataSelecionada) return;

    const data = new Date(this.dataSelecionada);
    this.apiService.get<HorarioDisponivel[]>(
      'agendamentos/horarios-disponiveis',
      {
        servicoId: this.servicoSelecionado.id,
        data: data.toISOString()
      }
    ).subscribe({
      next: (data) => {
        this.horarios = data;
      },
      error: (error) => {
        console.error('Erro ao carregar horários:', error);
      }
    });
  }

  selecionarHorario(dataHora: string): void {
    this.horarioSelecionado = dataHora;
  }

  formatarHora(dataHora: string): string {
    const date = new Date(dataHora);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  aplicarMascaraTelefone(event: any): void {
    const input = event.target;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito

    // Limita o tamanho máximo (11 dígitos para celular brasileiro)
    if (valor.length > 11) {
      valor = valor.substring(0, 11);
    }

    // Aplica a máscara baseado no tamanho
    let valorFormatado = '';
    if (valor.length === 0) {
      valorFormatado = '';
    } else if (valor.length <= 2) {
      valorFormatado = `(${valor}`;
    } else if (valor.length <= 6) {
      valorFormatado = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    } else if (valor.length <= 10) {
      // Telefone fixo: (XX) XXXX-XXXX
      valorFormatado = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}-${valor.substring(6)}`;
    } else {
      // Celular: (XX) XXXXX-XXXX
      valorFormatado = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7, 11)}`;
    }

    // Atualiza o valor no input e no formControl
    input.value = valorFormatado;
    this.formulario.patchValue({ telefone: valorFormatado }, { emitEvent: false });
  }

  confirmarAgendamento(): void {
    if (this.formulario.invalid || !this.servicoSelecionado || !this.horarioSelecionado) {
      return;
    }

    const agendamento = {
      clienteNome: this.formulario.value.nome,
      clienteTelefone: this.formulario.value.telefone,
      clienteEmail: this.formulario.value.email || null,
      servicoId: this.servicoSelecionado.id,
      dataHora: this.horarioSelecionado,
      observacoes: this.formulario.value.observacoes || null
    };

    this.apiService.post('agendamentos', agendamento).subscribe({
      next: () => {
        // Rastrear conversão no Meta Pixel
        if (this.servicoSelecionado) {
          this.metaPixel.trackScheduleAppointment(
            this.servicoSelecionado.id,
            this.servicoSelecionado.nome,
            this.servicoSelecionado.preco
          );
        }
        this.step = 4;
      },
      error: (error) => {
        console.error('Erro ao criar agendamento:', error);
        alert('Erro ao confirmar agendamento. Tente novamente.');
      }
    });
  }

  novoAgendamento(): void {
    this.step = 1;
    this.servicoSelecionado = undefined;
    this.horarioSelecionado = '';
    this.formulario.reset();
    this.router.navigate(['/agendamento']);
  }
}

