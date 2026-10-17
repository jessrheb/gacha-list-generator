import { Service } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, mergeMap, tap } from 'rxjs';

@Service()
export class RequestQueue {
  private static readonly MAX_CONCURRENT = 2;
  private readonly queue = new Subject<Observable<unknown>>();

  constructor() {
    this.queue
      .pipe(mergeMap((task) => task, RequestQueue.MAX_CONCURRENT))
      .subscribe();
  }

  run<Request>(source: Observable<Request>): Observable<Request> {
    const subject = new Subject<Request>();

    this.queue.next(
      source.pipe(
        tap({
          next: (value) => subject.next(value),
          error: (error) => subject.error(error),
          complete: () => subject.complete(),
        }),
        catchError(() => EMPTY),
      ),
    );

    return subject.asObservable();
  }
}
