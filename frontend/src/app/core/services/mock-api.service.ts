import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

// Interfaces
export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  duracao: number;
  preco: number;
  imagemUrl?: string;
  ativo: boolean;
  ordem: number;
}

export interface Agendamento {
  id: number;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail?: string;
  servicoId: number;
  servicoNome: string;
  dataHora: string;
  status: string;
  observacoes?: string;
  criadoEm: string;
}

export interface Feedback {
  id: number;
  nome: string;
  avaliacao: number;
  comentario: string;
  fotoUrl?: string;
  aprovado: boolean;
  respostaAdmin?: string;
  criadoEm: string;
}

export interface HorarioDisponivel {
  dataHora: string;
  disponivel: boolean;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
}

export interface DashboardData {
  estatisticas: {
    agendamentosHoje: number;
    agendamentosSemana: number;
    agendamentosMes: number;
    mediaAvaliacao: number;
  };
  proximosAgendamentos: Agendamento[];
  feedbacksRecentes: Feedback[];
}

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private readonly STORAGE_KEYS = {
    SERVICOS: 'barbearia_servicos',
    AGENDAMENTOS: 'barbearia_agendamentos',
    FEEDBACKS: 'barbearia_feedbacks',
    CONFIGURACOES: 'barbearia_configuracoes'
  };

  constructor() {
    this.inicializarDados();
  }

  // ========== INICIALIZAÇÃO ==========
  private inicializarDados(): void {
    // Inicializar serviços se não existirem
    if (!localStorage.getItem(this.STORAGE_KEYS.SERVICOS)) {
      const servicosMock: Servico[] = [
        {
          id: 1,
          nome: 'Corte Masculino',
          descricao: 'Corte de cabelo moderno com técnicas profissionais',
          duracao: 30,
          preco: 35.00,
          imagemUrl: undefined,
          ativo: true,
          ordem: 1
        },
        {
          id: 2,
          nome: 'Barba',
          descricao: 'Aparar e modelar barba com navalha e tesoura',
          duracao: 20,
          preco: 25.00,
          imagemUrl: undefined,
          ativo: true,
          ordem: 2
        },
        {
          id: 3,
          nome: 'Corte + Barba',
          descricao: 'Pacote completo: corte de cabelo e barba',
          duracao: 45,
          preco: 50.00,
          imagemUrl: undefined,
          ativo: true,
          ordem: 3
        },
        {
          id: 4,
          nome: 'Sobrancelha',
          descricao: 'Design e modelagem de sobrancelhas',
          duracao: 15,
          preco: 15.00,
          imagemUrl: undefined,
          ativo: true,
          ordem: 4
        },
        {
          id: 5,
          nome: 'Relaxamento Capilar',
          descricao: 'Tratamento de relaxamento para cabelos crespos e ondulados',
          duracao: 60,
          preco: 80.00,
          imagemUrl: undefined,
          ativo: true,
          ordem: 5
        },
        {
          id: 6,
          nome: 'Pigmentação de Barba',
          descricao: 'Aplicação de pigmento para dar volume à barba',
          duracao: 40,
          preco: 70.00,
          imagemUrl: undefined,
          ativo: true,
          ordem: 6
        }
      ];
      this.salvarServicos(servicosMock);
    }

    // Inicializar configurações
    if (!localStorage.getItem(this.STORAGE_KEYS.CONFIGURACOES)) {
      const configs = {
        horaInicio: '09:00',
        horaFim: '18:00',
        intervaloAgendamentos: 15
      };
      localStorage.setItem(this.STORAGE_KEYS.CONFIGURACOES, JSON.stringify(configs));
    }

    // Inicializar arrays vazios se não existirem
    if (!localStorage.getItem(this.STORAGE_KEYS.AGENDAMENTOS)) {
      localStorage.setItem(this.STORAGE_KEYS.AGENDAMENTOS, JSON.stringify([]));
    }
    // Inicializar feedbacks - criar mock apenas se não existir ou estiver vazio
    const feedbacksStorage = localStorage.getItem(this.STORAGE_KEYS.FEEDBACKS);
    let feedbacksExistentes: Feedback[] = [];
    try {
      feedbacksExistentes = feedbacksStorage ? JSON.parse(feedbacksStorage) : [];
    } catch {
      feedbacksExistentes = [];
    }
    
    if (feedbacksExistentes.length === 0) {
      const feedbacksMock: Feedback[] = [
        {
          id: 1,
          nome: 'Carlos Silva',
          avaliacao: 5,
          comentario: 'Excelente atendimento! O barbeiro foi muito profissional e atencioso. O corte ficou exatamente como eu queria. Com certeza voltarei!',
          fotoUrl: undefined,
          aprovado: true,
          respostaAdmin: undefined,
          criadoEm: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias atrás
        },
        {
          id: 2,
          nome: 'João Pedro Santos',
          avaliacao: 5,
          comentario: 'Melhor barbearia da cidade! Ambiente limpo, profissionais qualificados e preço justo. Recomendo para todos!',
          fotoUrl: undefined,
          aprovado: true,
          respostaAdmin: undefined,
          criadoEm: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 dias atrás
        },
        {
          id: 3,
          nome: 'Roberto Almeida',
          avaliacao: 5,
          comentario: 'Atendimento de primeira! Fui muito bem recebido, o serviço foi rápido e com muita qualidade. Valeu cada centavo!',
          fotoUrl: undefined,
          aprovado: true,
          respostaAdmin: undefined,
          criadoEm: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias atrás
        },
        {
          id: 4,
          nome: 'Lucas Ferreira',
          avaliacao: 5,
          comentario: 'Profissionais muito competentes e ambiente agradável. O corte ficou perfeito, exatamente o que eu precisava. Super recomendo!',
          fotoUrl: undefined,
          aprovado: true,
          respostaAdmin: undefined,
          criadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias atrás
        },
        {
          id: 5,
          nome: 'Marcos Oliveira',
          avaliacao: 5,
          comentario: 'Atendimento impecável! O barbeiro entendeu perfeitamente o que eu queria e o resultado superou minhas expectativas. Excelente trabalho!',
          fotoUrl: undefined,
          aprovado: true,
          respostaAdmin: undefined,
          criadoEm: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 dias atrás
        },
        {
          id: 6,
          nome: 'Felipe Costa',
          avaliacao: 5,
          comentario: 'Barbearia de qualidade! Ambiente moderno, profissionais experientes e atendimento personalizado. Ficou excelente!',
          fotoUrl: undefined,
          aprovado: true,
          respostaAdmin: undefined,
          criadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacksMock));
    }
  }

  // ========== SERVIÇOS ==========
  getServicos(apenasAtivos: boolean = false): Observable<Servico[]> {
    const servicos = this.carregarServicos();
    let resultado = apenasAtivos 
      ? servicos.filter(s => s.ativo)
      : servicos;
    
    resultado = resultado.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    return of(resultado).pipe(delay(300));
  }

  getServicoById(id: number): Observable<Servico | null> {
    const servicos = this.carregarServicos();
    const servico = servicos.find(s => s.id === id) || null;
    return of(servico).pipe(delay(200));
  }

  criarServico(dados: Partial<Servico>): Observable<Servico> {
    const servicos = this.carregarServicos();
    const novoId = servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1;
    
    const novoServico: Servico = {
      id: novoId,
      nome: dados.nome!,
      descricao: dados.descricao || '',
      duracao: dados.duracao || 30,
      preco: dados.preco || 0,
      imagemUrl: dados.imagemUrl || undefined,
      ativo: dados.ativo !== undefined ? dados.ativo : true,
      ordem: dados.ordem || 0
    };

    servicos.push(novoServico);
    this.salvarServicos(servicos);
    return of(novoServico).pipe(delay(400));
  }

  atualizarServico(id: number, dados: Partial<Servico>): Observable<Servico> {
    const servicos = this.carregarServicos();
    const index = servicos.findIndex(s => s.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Serviço não encontrado'));
    }

    servicos[index] = { ...servicos[index], ...dados };
    this.salvarServicos(servicos);
    return of(servicos[index]).pipe(delay(400));
  }

  excluirServico(id: number): Observable<void> {
    const agendamentos = this.carregarAgendamentos();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const temAgendamentosFuturos = agendamentos.some(a => {
      const dataAgendamento = new Date(a.dataHora);
      return a.servicoId === id && 
             dataAgendamento >= hoje && 
             a.status !== 'Cancelado';
    });

    if (temAgendamentosFuturos) {
      return throwError(() => new Error('Não é possível excluir serviço com agendamentos futuros'));
    }

    const servicos = this.carregarServicos();
    const index = servicos.findIndex(s => s.id === id);
    
    if (index === -1) {
      return throwError(() => new Error('Serviço não encontrado'));
    }

    servicos.splice(index, 1);
    this.salvarServicos(servicos);
    return of(void 0).pipe(delay(300));
  }

  // ========== AGENDAMENTOS ==========
  getAgendamentos(params?: any): Observable<Agendamento[]> {
    let agendamentos = this.carregarAgendamentos();

    if (params?.dataInicio) {
      const dataInicio = new Date(params.dataInicio);
      agendamentos = agendamentos.filter(a => new Date(a.dataHora) >= dataInicio);
    }

    if (params?.dataFim) {
      const dataFim = new Date(params.dataFim);
      agendamentos = agendamentos.filter(a => new Date(a.dataHora) <= dataFim);
    }

    if (params?.status !== undefined && params?.status !== null && params?.status !== '') {
      const statusMap: { [key: number]: string } = {
        1: 'Pendente',
        2: 'Confirmado',
        3: 'Concluido',
        4: 'Cancelado'
      };
      const statusFiltro = statusMap[params.status] || params.status;
      agendamentos = agendamentos.filter(a => a.status === statusFiltro);
    }

    agendamentos.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
    return of(agendamentos).pipe(delay(300));
  }

  getAgendamentoById(id: number): Observable<Agendamento | null> {
    const agendamentos = this.carregarAgendamentos();
    const agendamento = agendamentos.find(a => a.id === id) || null;
    return of(agendamento).pipe(delay(200));
  }

  criarAgendamento(dados: any): Observable<Agendamento> {
    const servicos = this.carregarServicos();
    const servico = servicos.find(s => s.id === dados.servicoId);

    if (!servico || !servico.ativo) {
      return throwError(() => new Error('Serviço não encontrado ou inativo'));
    }

    // Validar horário disponível
    if (!this.isHorarioDisponivel(dados.servicoId, dados.dataHora)) {
      return throwError(() => new Error('Horário não disponível'));
    }

    const agendamentos = this.carregarAgendamentos();
    const novoId = agendamentos.length > 0 ? Math.max(...agendamentos.map(a => a.id)) + 1 : 1;

    const novoAgendamento: Agendamento = {
      id: novoId,
      clienteNome: dados.clienteNome,
      clienteTelefone: dados.clienteTelefone,
      clienteEmail: dados.clienteEmail || undefined,
      servicoId: dados.servicoId,
      servicoNome: servico.nome,
      dataHora: dados.dataHora,
      status: 'Pendente',
      observacoes: dados.observacoes || undefined,
      criadoEm: new Date().toISOString()
    };

    agendamentos.push(novoAgendamento);
    this.salvarAgendamentos(agendamentos);
    return of(novoAgendamento).pipe(delay(400));
  }

  atualizarAgendamento(id: number, dados: any): Observable<Agendamento> {
    const agendamentos = this.carregarAgendamentos();
    const index = agendamentos.findIndex(a => a.id === id);

    if (index === -1) {
      return throwError(() => new Error('Agendamento não encontrado'));
    }

    const servicos = this.carregarServicos();
    const servico = servicos.find(s => s.id === dados.servicoId);

    if (!servico || !servico.ativo) {
      return throwError(() => new Error('Serviço não encontrado ou inativo'));
    }

    // Se mudou data/hora, validar disponibilidade
    const agendamentoAtual = agendamentos[index];
    if (agendamentoAtual.dataHora !== dados.dataHora || agendamentoAtual.servicoId !== dados.servicoId) {
      if (!this.isHorarioDisponivel(dados.servicoId, dados.dataHora, id)) {
        return throwError(() => new Error('Horário não disponível'));
      }
    }

    const statusMap: { [key: number]: string } = {
      1: 'Pendente',
      2: 'Confirmado',
      3: 'Concluido',
      4: 'Cancelado'
    };

    agendamentos[index] = {
      ...agendamentos[index],
      clienteNome: dados.clienteNome,
      clienteTelefone: dados.clienteTelefone,
      clienteEmail: dados.clienteEmail || undefined,
      servicoId: dados.servicoId,
      servicoNome: servico.nome,
      dataHora: dados.dataHora,
      status: typeof dados.status === 'number' ? statusMap[dados.status] || 'Pendente' : dados.status,
      observacoes: dados.observacoes || null
    };

    this.salvarAgendamentos(agendamentos);
    return of(agendamentos[index]).pipe(delay(400));
  }

  excluirAgendamento(id: number): Observable<void> {
    const agendamentos = this.carregarAgendamentos();
    const index = agendamentos.findIndex(a => a.id === id);

    if (index === -1) {
      return throwError(() => new Error('Agendamento não encontrado'));
    }

    agendamentos.splice(index, 1);
    this.salvarAgendamentos(agendamentos);
    return of(void 0).pipe(delay(300));
  }

  getHorariosDisponiveis(servicoId: number, data: string): Observable<HorarioDisponivel[]> {
    const servicos = this.carregarServicos();
    const servico = servicos.find(s => s.id === servicoId);

    if (!servico) {
      return of([]).pipe(delay(200));
    }

    const configs = this.carregarConfiguracoes();
    const horaInicio = this.parseTime(configs.horaInicio);
    const horaFim = this.parseTime(configs.horaFim);
    const intervalo = configs.intervaloAgendamentos || 15;

    const horarios: HorarioDisponivel[] = [];
    const dataSelecionada = new Date(data);
    dataSelecionada.setHours(0, 0, 0, 0);

    let horaAtual = new Date(dataSelecionada);
    horaAtual.setHours(horaInicio.hours, horaInicio.minutes, 0, 0);

    const horaFimDate = new Date(dataSelecionada);
    horaFimDate.setHours(horaFim.hours, horaFim.minutes, 0, 0);

    while (horaAtual < horaFimDate) {
      const dataHoraFim = new Date(horaAtual);
      dataHoraFim.setMinutes(dataHoraFim.getMinutes() + servico.duracao);

      if (dataHoraFim <= horaFimDate) {
        const disponivel = this.isHorarioDisponivel(servicoId, horaAtual.toISOString());
        horarios.push({
          dataHora: horaAtual.toISOString(),
          disponivel
        });
      }

      horaAtual.setMinutes(horaAtual.getMinutes() + intervalo);
    }

    return of(horarios).pipe(delay(300));
  }

  private isHorarioDisponivel(servicoId: number, dataHora: string, excluirAgendamentoId?: number): boolean {
    const agendamentos = this.carregarAgendamentos();
    const servicos = this.carregarServicos();
    const servico = servicos.find(s => s.id === servicoId);

    if (!servico) return false;

    const dataHoraAgendamento = new Date(dataHora);
    const dataHoraFim = new Date(dataHoraAgendamento);
    dataHoraFim.setMinutes(dataHoraFim.getMinutes() + servico.duracao);

    const conflitos = agendamentos.filter(a => {
      if (a.servicoId !== servicoId) return false;
      if (a.status === 'Cancelado') return false;
      if (excluirAgendamentoId && a.id === excluirAgendamentoId) return false;

      const dataAgendamento = new Date(a.dataHora);
      const servicoAgendamento = servicos.find(s => s.id === a.servicoId);
      if (!servicoAgendamento) return false;

      const dataAgendamentoFim = new Date(dataAgendamento);
      dataAgendamentoFim.setMinutes(dataAgendamentoFim.getMinutes() + servicoAgendamento.duracao);

      // Verificar sobreposição
      return (dataAgendamento <= dataHoraAgendamento && dataAgendamentoFim > dataHoraAgendamento) ||
             (dataAgendamento < dataHoraFim && dataAgendamento >= dataHoraAgendamento);
    });

    return conflitos.length === 0;
  }

  // ========== FEEDBACKS ==========
  getFeedbacks(apenasAprovados: boolean = false): Observable<Feedback[]> {
    let feedbacks = this.carregarFeedbacks();

    if (apenasAprovados) {
      feedbacks = feedbacks.filter(f => f.aprovado);
    }

    feedbacks.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
    return of(feedbacks).pipe(delay(300));
  }

  criarFeedback(dados: any): Observable<Feedback> {
    const feedbacks = this.carregarFeedbacks();
    const novoId = feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1;

    const novoFeedback: Feedback = {
      id: novoId,
      nome: dados.nome,
      avaliacao: dados.avaliacao,
      comentario: dados.comentario,
      fotoUrl: dados.fotoUrl || undefined,
      aprovado: false,
      respostaAdmin: undefined,
      criadoEm: new Date().toISOString()
    };

    feedbacks.push(novoFeedback);
    this.salvarFeedbacks(feedbacks);
    return of(novoFeedback).pipe(delay(400));
  }

  atualizarFeedback(id: number, dados: any): Observable<Feedback> {
    const feedbacks = this.carregarFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);

    if (index === -1) {
      return throwError(() => new Error('Feedback não encontrado'));
    }

    feedbacks[index] = {
      ...feedbacks[index],
      aprovado: dados.aprovado !== undefined ? dados.aprovado : feedbacks[index].aprovado,
      respostaAdmin: dados.respostaAdmin !== undefined ? dados.respostaAdmin : feedbacks[index].respostaAdmin
    };

    this.salvarFeedbacks(feedbacks);
    return of(feedbacks[index]).pipe(delay(400));
  }

  excluirFeedback(id: number): Observable<void> {
    const feedbacks = this.carregarFeedbacks();
    const index = feedbacks.findIndex(f => f.id === id);

    if (index === -1) {
      return throwError(() => new Error('Feedback não encontrado'));
    }

    feedbacks.splice(index, 1);
    this.salvarFeedbacks(feedbacks);
    return of(void 0).pipe(delay(300));
  }

  // ========== AUTH ==========
  login(credentials: { email: string; senha: string }): Observable<LoginResponse> {
    // Login fake para demo
    if (credentials.email === 'admin@barbearia.com' && credentials.senha === 'admin123') {
      const response: LoginResponse = {
        token: 'demo-token-' + Date.now(),
        nome: 'Administrador',
        email: 'admin@barbearia.com'
      };
      return of(response).pipe(delay(500));
    }
    return throwError(() => new Error('Email ou senha inválidos'));
  }

  // ========== DASHBOARD ==========
  getDashboard(): Observable<DashboardData> {
    const agendamentos = this.carregarAgendamentos();
    const feedbacks = this.carregarFeedbacks();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const fimHoje = new Date(hoje);
    fimHoje.setHours(23, 59, 59, 999);

    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);
    fimSemana.setHours(23, 59, 59, 999);

    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59, 999);

    const agendamentosHoje = agendamentos.filter(a => {
      const data = new Date(a.dataHora);
      return data >= hoje && data <= fimHoje && a.status !== 'Cancelado';
    }).length;

    const agendamentosSemana = agendamentos.filter(a => {
      const data = new Date(a.dataHora);
      return data >= inicioSemana && data <= fimSemana && a.status !== 'Cancelado';
    }).length;

    const agendamentosMes = agendamentos.filter(a => {
      const data = new Date(a.dataHora);
      return data >= inicioMes && data <= fimMes && a.status !== 'Cancelado';
    }).length;

    const feedbacksAprovados = feedbacks.filter(f => f.aprovado);
    const mediaAvaliacao = feedbacksAprovados.length > 0
      ? feedbacksAprovados.reduce((sum, f) => sum + f.avaliacao, 0) / feedbacksAprovados.length
      : 0;

    const proximosAgendamentos = agendamentos
      .filter(a => {
        const data = new Date(a.dataHora);
        return data >= hoje && a.status !== 'Cancelado';
      })
      .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
      .slice(0, 10);

    const feedbacksRecentes = feedbacks
      .filter(f => f.aprovado)
      .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
      .slice(0, 5);

    const dashboard: DashboardData = {
      estatisticas: {
        agendamentosHoje,
        agendamentosSemana,
        agendamentosMes,
        mediaAvaliacao: Math.round(mediaAvaliacao * 10) / 10
      },
      proximosAgendamentos,
      feedbacksRecentes
    };

    return of(dashboard).pipe(delay(400));
  }

  // ========== HELPERS ==========
  private carregarServicos(): Servico[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.SERVICOS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private salvarServicos(servicos: Servico[]): void {
    localStorage.setItem(this.STORAGE_KEYS.SERVICOS, JSON.stringify(servicos));
  }

  private carregarAgendamentos(): Agendamento[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.AGENDAMENTOS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private salvarAgendamentos(agendamentos: Agendamento[]): void {
    localStorage.setItem(this.STORAGE_KEYS.AGENDAMENTOS, JSON.stringify(agendamentos));
  }

  private carregarFeedbacks(): Feedback[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.FEEDBACKS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private salvarFeedbacks(feedbacks: Feedback[]): void {
    localStorage.setItem(this.STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  }

  private carregarConfiguracoes(): { horaInicio: string; horaFim: string; intervaloAgendamentos: number } {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.CONFIGURACOES);
      return stored ? JSON.parse(stored) : { horaInicio: '09:00', horaFim: '18:00', intervaloAgendamentos: 15 };
    } catch {
      return { horaInicio: '09:00', horaFim: '18:00', intervaloAgendamentos: 15 };
    }
  }

  private parseTime(timeStr: string): { hours: number; minutes: number } {
    const parts = timeStr.split(':');
    return {
      hours: parseInt(parts[0]) || 9,
      minutes: parseInt(parts[1]) || 0
    };
  }
}

