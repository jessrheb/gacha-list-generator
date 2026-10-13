import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/global-error-handler';
import { httpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { rateLimitInterceptor } from './core/interceptors/rate-limit-interceptor';
import { concurrencyQueueInterceptor } from './core/interceptors/concurrency-queue-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        concurrencyQueueInterceptor,
        rateLimitInterceptor,
        httpErrorInterceptor,
      ]),
    ),
    provideRouter(routes),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
