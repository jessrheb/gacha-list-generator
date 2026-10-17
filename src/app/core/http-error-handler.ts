import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Service()
export class HttpErrorHandler {
  private readonly ngToast = inject(NgToastService);

  private static readonly DEDUP_WINDOW_MS = 3000;

  private lastMessage: string | null = null;
  private lastShownAt = 0;

  private show(message: string): void {
    const now = Date.now();

    if (
      message === this.lastMessage &&
      now - this.lastShownAt < HttpErrorHandler.DEDUP_WINDOW_MS
    ) {
      return;
    }
    this.lastMessage = message;
    this.lastShownAt = now;
    this.ngToast.danger(message);
  }

  handleGlobalError(error: unknown): void {
    console.error('[HttpErrorHandler]', error);
    this.show('Something weird happened. Try again later.');
  }

  handleHttpError(error: HttpErrorResponse): void {
    this.show(this.getHttpMessage(error));
  }

  private getHttpMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Network error. Please check your connection.';
    }

    const serverMessage = error.error?.message as string | undefined;

    switch (error.status) {
      case 400:
        return serverMessage ?? 'Bad Request';
      case 401:
        return serverMessage ?? 'Unauthorized';
      case 403:
        return serverMessage ?? 'Forbidden';
      case 404:
        return serverMessage ?? 'Not Found';
      case 429:
        return serverMessage ?? 'Too Many Requests';
      case 500:
        return serverMessage ?? 'Internal Server Error';
      case 502:
      case 503:
      case 504:
        return serverMessage ?? 'Server temporarily unavailable';
      default:
        return serverMessage ?? 'Unexpected error occurred';
    }
  }
}
