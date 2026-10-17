import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgToast } from 'ng-angular-popup';
import { TOAST_CONFIG } from './app.constants';
import { routes } from './app.routes';
import { concurrencyQueueInterceptor } from './core/interceptors/concurrency-queue-interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { rateLimitInterceptor } from './core/interceptors/rate-limit-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideNgToast(TOAST_CONFIG),
    provideHttpClient(
      withInterceptors([
        httpErrorInterceptor,
        rateLimitInterceptor,
        concurrencyQueueInterceptor,
      ]),
    ),
    provideRouter(routes),
  ],
};
