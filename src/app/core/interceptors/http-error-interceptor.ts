import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  mergeMap,
  Observable,
  retryWhen,
  throwError,
  timer,
} from 'rxjs';
import { HttpErrorHandler } from '../http-error-handler';

function isRetryable(error: unknown): error is HttpErrorResponse {
  return (
    error instanceof HttpErrorResponse &&
    (error.status === 0 || error.status === 429 || error.status >= 500)
  );
}

function retryDelay(error: HttpErrorResponse, retryCount: number): number {
  const header = error.headers?.get('Retry-After');
  const seconds = header ? Number(header) : Number.NaN;
  const fromHeader =
    Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : undefined;
  const fromBody = error.error?.retryAfterMs as number | undefined;
  return fromBody ?? fromHeader ?? 2 ** retryCount * 1000;
}

const MAX_RETRIES = 3;

export const httpErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const handler = inject(HttpErrorHandler);

  return next(request).pipe(
    retryWhen((errors) =>
      errors.pipe(
        mergeMap((error: unknown, retryCount) => {
          if (!isRetryable(error) || retryCount >= MAX_RETRIES) {
            return throwError(() => error);
          }
          return timer(retryDelay(error, retryCount));
        }),
      ),
    ),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        handler.handleHttpError(error);
      } else {
        handler.handleGlobalError(error);
      }
      return throwError(() => error);
    }),
  );
};
