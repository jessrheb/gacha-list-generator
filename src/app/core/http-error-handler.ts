import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Service()
export class HttpErrorHandler {
  private readonly snackBar = inject(MatSnackBar);

  private static readonly DEDUP_WINDOW_MS = 3000;
  private lastMessage: string | null = null;
  private lastShownAt = 0;

  private show(message: string, action: string): void {
    const now = Date.now();
    if (
      message === this.lastMessage &&
      now - this.lastShownAt < HttpErrorHandler.DEDUP_WINDOW_MS
    ) {
      return;
    }
    this.lastMessage = message;
    this.lastShownAt = now;
    this.snackBar.open(message, action, { duration: 5000 });
  }

  handleGlobalError(error: unknown): void {
    console.error('[HttpErrorHandler]', error);
    this.show('Something went wrong.', 'Dismiss');
  }

  handleHttpError(error: HttpErrorResponse): void {
    this.show(this.getHttpMessage(error), 'Close');
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
