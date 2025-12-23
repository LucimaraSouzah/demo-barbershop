import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  duracao: number;
  preco: number;
  imagemUrl?: string;
  ativo: boolean;
  ordem: number;
}

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-4 sm:space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-primary dark:text-white">Serviços</h1>
        <button (click)="abrirModal()" class="btn-primary w-full sm:w-auto">Novo Serviço</button>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[640px]">
            <thead>
              <tr class="border-b">
                <th class="text-left p-2">Imagem</th>
                <th class="text-left p-2">Nome</th>
                <th class="text-left p-2">Duração</th>
                <th class="text-left p-2">Preço</th>
                <th class="text-left p-2">Status</th>
                <th class="text-left p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let servico of servicos" class="border-b hover:bg-gray-50">
                <td class="p-2">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 rounded overflow-hidden border border-gray-200 bg-gray-100">
                    <img 
                      [src]="getServiceImageUrl(servico)" 
                      [alt]="servico.nome"
                      class="w-full h-full object-cover"
                      (error)="handleImageError($event)"
                      loading="lazy"
                    />
                  </div>
                </td>
                <td class="p-2 font-medium text-sm sm:text-base">{{ servico.nome }}</td>
                <td class="p-2 text-sm sm:text-base">{{ servico.duracao }} min</td>
                <td class="p-2 text-sm sm:text-base">R$ {{ servico.preco.toFixed(2) }}</td>
                <td class="p-2">
                  <span [class.text-green-600]="servico.ativo" [class.text-red-600]="!servico.ativo" class="font-medium text-xs sm:text-sm">
                    {{ servico.ativo ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
                <td class="p-2">
                  <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <button (click)="editar(servico)" class="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm">Editar</button>
                    <button (click)="excluir(servico.id)" class="text-red-600 hover:text-red-800 font-medium text-xs sm:text-sm">Excluir</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal -->
      <div *ngIf="mostrarModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div class="bg-gray-100 rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto dark:bg-gray-900">
          <h2 class="text-2xl font-bold mb-4">{{ servicoEditando ? 'Editar' : 'Novo' }} Serviço</h2>
          <form [formGroup]="formulario" (ngSubmit)="salvar()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Nome *</label>
              <input type="text" formControlName="nome" class="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Descrição</label>
              <textarea formControlName="descricao" rows="3" class="w-full p-2 border rounded-lg"></textarea>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Duração (min) *</label>
                <input type="number" formControlName="duracao" class="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Preço *</label>
                <input type="number" step="0.01" formControlName="preco" class="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <!-- Upload de Imagem -->
            <div>
              <label class="block text-sm font-medium mb-2">Imagem do Serviço</label>
              
              <!-- Preview da Imagem -->
              <div *ngIf="imagemPreview" class="mb-4 relative">
                <div class="relative group">
                  <img [src]="imagemPreview" alt="Preview da imagem" class="w-full h-64 object-cover rounded-lg border-2 border-gray-300 shadow-md" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                    <button 
                      type="button" 
                      (click)="removerImagem()" 
                      class="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-opacity"
                    >
                      Remover Imagem
                    </button>
                  </div>
                </div>
                <button 
                  type="button" 
                  (click)="removerImagem()" 
                  class="mt-2 text-red-600 text-sm hover:text-red-800 font-medium inline-flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Remover Imagem
                </button>
              </div>

              <!-- Opções de Upload -->
              <div class="space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <!-- Botão Upload -->
                  <label class="block">
                    <input 
                      type="file" 
                      accept="image/*" 
                      (change)="onFileSelected($event)"
                      class="hidden" 
                      #fileInput
                    />
                    <div 
                      (click)="fileInput.click(); $event.preventDefault()"
                      class="btn-secondary cursor-pointer inline-flex items-center justify-center gap-2 w-full text-center py-2"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      Escolher Arquivo
                    </div>
                  </label>

                  <!-- Botão Câmera -->
                  <label class="block">
                    <input 
                      type="file" 
                      accept="image/*" 
                      [attr.capture]="'environment'"
                      (change)="onFileSelected($event)"
                      class="hidden" 
                      #cameraInput
                    />
                    <div 
                      (click)="cameraInput.click(); $event.preventDefault()"
                      class="btn-outline cursor-pointer inline-flex items-center justify-center gap-2 w-full text-center py-2"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      Tirar Foto
                    </div>
                  </label>
                </div>

                <!-- Ou URL -->
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                <!-- Input URL -->
                <input 
                  type="url" 
                  formControlName="imagemUrl" 
                  placeholder="Cole a URL da imagem (ex: https://exemplo.com/imagem.jpg)"
                  class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                  (input)="onUrlChange()"
                  (focus)="imagemFile = null"
                />
                <p class="text-xs text-gray-500">
                  Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <label class="flex items-center">
                <input type="checkbox" formControlName="ativo" class="mr-2" />
                Ativo
              </label>
              <div>
                <label class="block text-sm font-medium mb-2">Ordem</label>
                <input type="number" formControlName="ordem" class="w-20 p-2 border rounded-lg" />
              </div>
            </div>
            <div class="flex gap-4">
              <button type="button" (click)="fecharModal()" class="btn-secondary flex-1">Cancelar</button>
              <button type="submit" class="btn-primary flex-1" [disabled]="formulario.invalid">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ServicosComponent implements OnInit {
  servicos: Servico[] = [];
  mostrarModal = false;
  servicoEditando?: Servico;
  formulario: FormGroup;
  imagemPreview: string | null = null;
  imagemFile: File | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      duracao: [30, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      imagemUrl: [''],
      ativo: [true],
      ordem: [0]
    });
  }

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    const timestamp = new Date().getTime();
    this.apiService.get<Servico[]>('servicos', { _t: timestamp }).subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          this.servicos = [];
          return;
        }
        
        const imagensStorage = this.carregarImagensStorage();
        
        this.servicos = data.map(s => {
          const imagemBackend = s.imagemUrl && s.imagemUrl.trim() !== '' ? s.imagemUrl : undefined;
          const imagemStorage = imagensStorage[s.id];
          
          return {
            ...s,
            imagemUrl: imagemBackend || imagemStorage || undefined
          };
        }).sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
        alert('Erro ao carregar serviços. Tente novamente.');
      }
    });
  }

  private salvarImagemStorage(servicoId: number, imagemUrl: string): void {
    try {
      const imagens = this.carregarImagensStorage();
      imagens[servicoId] = imagemUrl;
      localStorage.setItem('servicos_imagens', JSON.stringify(imagens));
    } catch (error) {
      this.limparImagensAntigas();
    }
  }

  private carregarImagensStorage(): { [key: number]: string } {
    try {
      const stored = localStorage.getItem('servicos_imagens');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      return {};
    }
  }

  private removerImagemStorage(servicoId: number): void {
    try {
      const imagens = this.carregarImagensStorage();
      delete imagens[servicoId];
      localStorage.setItem('servicos_imagens', JSON.stringify(imagens));
    } catch (error) {
      // Silencioso
    }
  }

  private limparImagensAntigas(): void {
    try {
      localStorage.removeItem('servicos_imagens');
    } catch (error) {
      // Silencioso
    }
  }

  temImagem(imagemUrl: string | null | undefined): boolean {
    // Sempre retorna true porque sempre temos uma imagem (local ou customizada)
    return true;
  }

  getServiceImageUrl(servico: Servico): string {
    // PRIORIDADE 1: Se tem imagemUrl customizada (upload ou URL), usar ela
    if (servico.imagemUrl && servico.imagemUrl.trim() !== '') {
      return servico.imagemUrl;
    }

    // PRIORIDADE 2: Mapear nomes dos serviços para imagens locais (assets/img)
    const localImages: { [key: string]: string } = {
      'Corte Masculino': '/assets/img/corte-masculino.jpg',
      'Barba': '/assets/img/barba.png',
      'Corte + Barba': '/assets/img/barba-corte.jpg',
      'Sobrancelha': '/assets/img/sobrancelha.jpg',
      'Pigmentação de Barba': '/assets/img/pigmentacao-barba.png',
      'Relaxamento Capilar': 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=600&fit=crop&q=80&auto=format'
    };

    // Se tem imagem local, usa ela
    if (localImages[servico.nome]) {
      return localImages[servico.nome];
    }

    // PRIORIDADE 3: Imagem padrão de barbearia
    return 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop&q=80&auto=format';
  }

  handleImageError(event: any): void {
    // Se a imagem falhar ao carregar, oculta a imagem e mostra o placeholder
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    if (parent && !parent.querySelector('.error-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'error-placeholder w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center p-1';
      placeholder.textContent = 'Sem Imagem';
      parent.appendChild(placeholder);
    }
  }

  abrirModal(): void {
    this.servicoEditando = undefined;
    this.formulario.reset({ ativo: true, duracao: 30, preco: 0, ordem: 0 });
    this.imagemPreview = null;
    this.imagemFile = null;
    this.mostrarModal = true;
  }

  editar(servico: Servico): void {
    this.servicoEditando = servico;
    
    // Atualizar formulário com os dados do serviço
    this.formulario.patchValue({
      nome: servico.nome,
      descricao: servico.descricao,
      duracao: servico.duracao,
      preco: servico.preco,
      imagemUrl: servico.imagemUrl || '',
      ativo: servico.ativo,
      ordem: servico.ordem
    });
    
    // Se já tem imagem, mostra preview
    if (servico.imagemUrl && servico.imagemUrl.trim() !== '') {
      this.imagemPreview = servico.imagemUrl;
    } else {
      this.imagemPreview = null;
    }
    
    this.imagemFile = null;
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.servicoEditando = undefined;
    this.formulario.reset();
    this.imagemPreview = null;
    this.imagemFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    
    if (!file) {
      event.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      event.target.value = '';
      return;
    }

    this.imagemFile = file;
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      const base64 = e.target.result;
      this.imagemPreview = base64;
      this.formulario.patchValue({ imagemUrl: base64 }, { emitEvent: true });
      event.target.value = '';
      this.cdr.detectChanges();
    };
    
    reader.onerror = () => {
      alert('Erro ao ler o arquivo. Tente novamente.');
      event.target.value = '';
      this.imagemFile = null;
      this.imagemPreview = null;
    };
    
    reader.readAsDataURL(file);
  }

  onUrlChange(): void {
    const url = this.formulario.get('imagemUrl')?.value;
    // Limpar arquivo se estiver usando URL
    this.imagemFile = null;
    if (url && (url.startsWith('http') || url.startsWith('https'))) {
      this.imagemPreview = url;
      this.imagemFile = null;
    } else if (!url) {
      this.imagemPreview = null;
    }
  }

  removerImagem(): void {
    this.imagemPreview = null;
    this.imagemFile = null;
    this.formulario.patchValue({ imagemUrl: '' });
  }

  salvar(): void {
    if (this.formulario.invalid) return;

    // Pegar valores do formulário (a imagem já deve estar convertida em base64 no formulário)
    const dados = { ...this.formulario.value };
    
    // Se tem preview mas não tem no formulário (fallback de segurança)
    if (this.imagemPreview && !dados.imagemUrl) {
      dados.imagemUrl = this.imagemPreview;
    }
    
    // Enviar dados (a imagem já deve estar em dados.imagemUrl como base64)
    // Não precisa converter novamente porque já foi convertido em onFileSelected
    this.enviarDados(dados);
  }

  private enviarDados(dados: any): void {
    const temImagem = dados.imagemUrl && dados.imagemUrl.trim() !== '';
    
    if (this.servicoEditando) {
      const servicoId = this.servicoEditando.id;
      
      if (temImagem) {
        this.salvarImagemStorage(servicoId, dados.imagemUrl);
      } else {
        this.removerImagemStorage(servicoId);
      }
      
      this.apiService.put<Servico>(`servicos/${servicoId}`, dados).subscribe({
        next: (response) => {
          const imagemFinal = response?.imagemUrl && response.imagemUrl.trim() !== '' 
            ? response.imagemUrl 
            : this.carregarImagensStorage()[servicoId];
          
          if (response && response.id) {
            const index = this.servicos.findIndex(s => s.id === response.id);
            if (index !== -1) {
              this.servicos[index] = { 
                ...this.servicos[index], 
                ...response, 
                imagemUrl: imagemFinal || undefined 
              };
            }
          }
          
          setTimeout(() => {
            this.carregarServicos();
            this.fecharModal();
          }, 500);
        },
        error: (error) => {
          console.error('Erro ao atualizar serviço:', error);
          if (error.status === 401) {
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            this.authService.logout();
            return;
          }
          alert('Erro ao salvar serviço. Tente novamente.');
        }
      });
    } else {
      this.apiService.post<Servico>('servicos', dados).subscribe({
        next: (response) => {
          console.log('✅ Serviço criado - Resposta do backend:', response);
          
          // Salvar imagem no localStorage se tiver
          if (response && response.id && temImagem) {
            this.salvarImagemStorage(response.id, dados.imagemUrl);
          }
          
          setTimeout(() => {
            this.carregarServicos();
            this.fecharModal();
          }, 500);
        },
        error: (error) => {
          console.error('❌ Erro ao criar serviço:', error);
          if (error.status === 401) {
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            this.authService.logout();
            return;
          }
          alert('Erro ao criar serviço. Verifique o console para mais detalhes.');
        }
      });
    }
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    this.apiService.delete(`servicos/${id}`).subscribe({
      next: () => {
        this.carregarServicos();
      },
      error: (error) => {
        console.error('Erro ao excluir serviço:', error);
        if (error.status === 401) {
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          this.authService.logout();
          return;
        }
        alert('Erro ao excluir serviço. Verifique se não há agendamentos futuros.');
      }
    });
  }
}

