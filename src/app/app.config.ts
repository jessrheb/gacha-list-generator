import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgToast } from 'ng-angular-popup';
import { providePrimeNG } from 'primeng/config';
import { PRIMEUI_LICENSE_KEY, TOAST_CONFIG } from './app.constants';
import { routes } from './app.routes';
import { concurrencyQueueInterceptor } from './core/interceptors/concurrency-queue-interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { rateLimitInterceptor } from './core/interceptors/rate-limit-interceptor';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        httpErrorInterceptor,
        rateLimitInterceptor,
        concurrencyQueueInterceptor,
      ]),
    ),
    provideNgToast(TOAST_CONFIG),
    providePrimeNG({
      license: PRIMEUI_LICENSE_KEY,
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
          cssVariables: true,
        },
      },
    }),
    provideRouter(routes),
    provideZonelessChangeDetection(),
  ],
};
