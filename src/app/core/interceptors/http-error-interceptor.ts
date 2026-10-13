import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpErrorHandler } from '../http-error-handler';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const handler = inject(HttpErrorHandler);

  return next(req).pipe(
    catchError((error: Error) => {
      if (error instanceof HttpErrorResponse) {
        handler.handleHttpError(error);
      } else {
        handler.handleGlobalError(error);
      }
      return throwError(() => error);
    }),
  );
};
