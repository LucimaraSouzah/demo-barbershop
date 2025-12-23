import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private mockApi: MockApiService) { }

  get<T>(endpoint: string, params?: any): Observable<T> {
    // Serviços
    if (endpoint === 'servicos' || endpoint.startsWith('servicos/')) {
      if (endpoint === 'servicos') {
        return this.mockApi.getServicos(params?.apenasAtivos || false) as Observable<T>;
      } else {
        const id = parseInt(endpoint.split('/')[1]);
        return this.mockApi.getServicoById(id) as Observable<T>;
      }
    }

    // Agendamentos
    if (endpoint === 'agendamentos' || endpoint.startsWith('agendamentos/')) {
      if (endpoint === 'agendamentos') {
        return this.mockApi.getAgendamentos(params) as Observable<T>;
      } else if (endpoint.includes('horarios-disponiveis')) {
        return this.mockApi.getHorariosDisponiveis(params.servicoId, params.data) as Observable<T>;
      } else {
        const id = parseInt(endpoint.split('/')[1]);
        return this.mockApi.getAgendamentoById(id) as Observable<T>;
      }
    }

    // Feedbacks
    if (endpoint === 'feedbacks' || endpoint.startsWith('feedbacks/')) {
      if (endpoint === 'feedbacks') {
        return this.mockApi.getFeedbacks(params?.apenasAprovados || false) as Observable<T>;
      } else {
        // Para GET de feedback individual, não implementado mas retorna null
        return throwError(() => new Error('Not implemented')) as Observable<T>;
      }
    }

    // Auth
    if (endpoint === 'auth/login') {
      // Não deve ser chamado via GET
      return throwError(() => new Error('Use POST for login')) as Observable<T>;
    }

    // Dashboard
    if (endpoint === 'admin/dashboard') {
      return this.mockApi.getDashboard() as Observable<T>;
    }

    return throwError(() => new Error(`Endpoint não encontrado: ${endpoint}`)) as Observable<T>;
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    // Serviços
    if (endpoint === 'servicos') {
      return this.mockApi.criarServico(body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Agendamentos
    if (endpoint === 'agendamentos') {
      return this.mockApi.criarAgendamento(body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Feedbacks
    if (endpoint === 'feedbacks') {
      return this.mockApi.criarFeedback(body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Auth
    if (endpoint === 'auth/login') {
      return this.mockApi.login(body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    return throwError(() => new Error(`Endpoint não encontrado: ${endpoint}`)) as Observable<T>;
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    // Serviços
    if (endpoint.startsWith('servicos/')) {
      const id = parseInt(endpoint.split('/')[1]);
      return this.mockApi.atualizarServico(id, body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Agendamentos
    if (endpoint.startsWith('agendamentos/')) {
      const id = parseInt(endpoint.split('/')[1]);
      return this.mockApi.atualizarAgendamento(id, body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Feedbacks
    if (endpoint.startsWith('feedbacks/')) {
      const id = parseInt(endpoint.split('/')[1]);
      return this.mockApi.atualizarFeedback(id, body).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    return throwError(() => new Error(`Endpoint não encontrado: ${endpoint}`)) as Observable<T>;
  }

  delete<T>(endpoint: string): Observable<T> {
    // Serviços
    if (endpoint.startsWith('servicos/')) {
      const id = parseInt(endpoint.split('/')[1]);
      return this.mockApi.excluirServico(id).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Agendamentos
    if (endpoint.startsWith('agendamentos/')) {
      const id = parseInt(endpoint.split('/')[1]);
      return this.mockApi.excluirAgendamento(id).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    // Feedbacks
    if (endpoint.startsWith('feedbacks/')) {
      const id = parseInt(endpoint.split('/')[1]);
      return this.mockApi.excluirFeedback(id).pipe(
        catchError(error => this.formatError(error))
      ) as Observable<T>;
    }

    return throwError(() => new Error(`Endpoint não encontrado: ${endpoint}`)) as Observable<T>;
  }

  private formatError(error: any): Observable<never> {
    // Formatar erro para compatibilidade com código que espera HttpErrorResponse
    const httpError = {
      status: 400,
      statusText: 'Bad Request',
      message: error?.message || 'Erro desconhecido',
      error: error?.message || 'Erro desconhecido'
    };
    return throwError(() => httpError);
  }
}

