import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {
  GLOBAL_RATE_LIMIT_CONFIG,
  RateLimitProperties,
  RequestState,
} from '../rate-limit.config';

function initialState(config: RateLimitProperties, now: number): RequestState {
  return {
    windows: config.windows.map((window) => ({
      count: 0,
      resetAt: now + window.intervalDuration,
    })),
    serverBlockedUntil: 0,
  };
}

const config = GLOBAL_RATE_LIMIT_CONFIG;
const state = initialState(config, Date.now());
const { windows } = config;

function rateLimitedError(retryAfterMs: number): HttpErrorResponse {
  return new HttpErrorResponse({
    status: 429,
    statusText: 'Too Many Requests',
    error: { message: 'Client-side rate limit', retryAfterMs },
  });
}

function reserve(now: number): number {
  if (state.serverBlockedUntil > now) {
    return state.serverBlockedUntil - now;
  }

  let waitMs = 0;

  for (let index = 0; index < windows.length; index++) {
    const { maxRequests, intervalDuration } = windows[index];
    const window = state.windows[index];

    if (now >= window.resetAt) {
      window.count = 0;
      window.resetAt = now + intervalDuration;
    }
    if (window.count >= maxRequests) {
      waitMs = Math.max(waitMs, window.resetAt - now);
    }
  }

  if (waitMs > 0) return waitMs;

  for (const window of state.windows) window.count++;
  return 0;
}

function release(): void {
  for (const window of state.windows) window.count--;
}

function applyServerBackoff(error: HttpErrorResponse): void {
  const header = error.headers.get('Retry-After');
  const seconds = header ? Number(header) : Number.NaN;
  const waitMs =
    Number.isFinite(seconds) && seconds > 0 ?
      seconds * 1000
    : config.defaultBlockDuration;
  state.serverBlockedUntil = Date.now() + waitMs;
}

export const rateLimitInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (!config.appliesTo(request.url)) return next(request);

  const waitMs = reserve(Date.now());
  if (waitMs > 0) {
    return throwError(() => rateLimitedError(waitMs));
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 429) {
        applyServerBackoff(error);
      } else if (error.status === 0) {
        release();
      }
      return throwError(() => error);
    }),
  );
};
