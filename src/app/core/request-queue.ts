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
    return new Observable<Request>((subscriber) => {
      const subject = new Subject<Request>();
      const subjectSubscription = subject.subscribe(subscriber);

      this.queue.next(
        source.pipe(
          tap({
            next: (v) => subject.next(v),
            error: (e) => subject.error(e),
            complete: () => subject.complete(),
          }),
          catchError(() => EMPTY),
        ),
      );

      return () => subjectSubscription.unsubscribe();
    });
  }
}
