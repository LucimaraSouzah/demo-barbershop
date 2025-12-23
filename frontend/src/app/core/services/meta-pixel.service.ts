import { Injectable } from '@angular/core';

declare global {
  interface Window {
    fbq: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetaPixelService {
  private pixelId: string = ''; // Será configurado via environment

  constructor() {
    this.loadPixel();
  }

  private loadPixel(): void {
    // O script do Meta Pixel será carregado no index.html
    // Este serviço apenas fornece métodos para rastrear eventos
  }

  trackPageView(): void {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }

  trackScheduleAppointment(servicoId: number, servicoNome: string, valor: number): void {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ScheduleAppointment', {
        content_name: servicoNome,
        content_ids: [servicoId.toString()],
        value: valor,
        currency: 'BRL'
      });
    }
  }

  trackViewService(servicoId: number, servicoNome: string): void {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: servicoNome,
        content_ids: [servicoId.toString()],
        content_type: 'service'
      });
    }
  }

  trackInitiateCheckout(servicoId: number, servicoNome: string): void {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: servicoNome,
        content_ids: [servicoId.toString()],
        value: 0,
        currency: 'BRL'
      });
    }
  }
}

