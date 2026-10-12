import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Service()
export class HttpErrorHandler {
  protected readonly snackBar = inject(MatSnackBar);

  handleGlobalError(error: Error): void {
    console.error(error);
    this.snackBar.open('Something went wrong.', 'Dismiss', { duration: 5000 });
  }

  handleHttpError(error: HttpErrorResponse): void {
    const message = this.getHttpMessage(error);
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  private getHttpMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Network error. Please check your connection.';
    }

    switch (error.status) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 429:
        return 'Too Many Requests';
      case 500:
        return 'Internal Server Error';
      case 502:
      case 503:
      case 504:
        return 'Server temporarily unavailable';
      default:
        return 'Unexpected error occurred';
    }
  }
}
