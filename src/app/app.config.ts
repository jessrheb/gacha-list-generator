import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { concurrencyQueueInterceptor } from './core/interceptors/concurrency-queue-interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { rateLimitInterceptor } from './core/interceptors/rate-limit-interceptor';

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
    provideRouter(routes),
  ],
};
