import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RequestQueue } from '../request-queue';

export const concurrencyQueueInterceptor: HttpInterceptorFn = (req, next) => {
  return inject(RequestQueue).run(next(req));
};
