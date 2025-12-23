import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// HttpClient removido - usando MockApiService agora

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync()
    // HttpClient removido - não precisamos mais de HTTP real
  ]
};
