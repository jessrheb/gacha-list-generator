import {
  EMPTY,
  Observable,
  catchError,
  expand,
  map,
  reduce,
  throwError,
} from 'rxjs';
import type { IValidation } from 'typia';
import { TypiaValidationError } from '../../../core/errors/typia-validation-error.error';
import { OFFSET } from './gacha-data.constants';
import { GlobalGachaDataDTO } from './models/gacha-data.dto';

export function fetchAllPages<R extends GlobalGachaDataDTO, T>(
  fetchPage: (offset: number) => Observable<R>,
  extractItems: (response: R) => T[],
): Observable<T[]> {
  return fetchPage(OFFSET).pipe(
    expand((response) => {
      const receivedSoFar = extractItems(response).length;
      const nextOffset = response.offset + receivedSoFar;

      return receivedSoFar > 0 && nextOffset < response.total ?
          fetchPage(nextOffset)
        : EMPTY;
    }),
    map(extractItems),
    reduce(
      (accumulation, response) => accumulation.concat(response),
      [] as T[],
    ),
  );
}

export function logTypiaValidationError(error: TypiaValidationError) {
  const errorMessage = error.validation.errors
    .map(
      (error) =>
        `Path: ${error.path}, Expected: ${error.expected}, Value: ${JSON.stringify(error.value)}`,
    )
    .join('; ');

  console.error(errorMessage);
}

export function validateResponse<R>(
  validate: (input: unknown) => IValidation<R>,
): (source: Observable<R>) => Observable<R> {
  return (source) =>
    source.pipe(
      map((response) => {
        const validatedResult = validate(response);
        if (!validatedResult.success)
          throw new TypiaValidationError(validatedResult);
        return validatedResult.data;
      }),
      catchError((error: unknown) => {
        if (error instanceof TypiaValidationError)
          logTypiaValidationError(error);
        return throwError(() => error);
      }),
    );
}
