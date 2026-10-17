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
import { GachaDataPagedDTO } from './models/gacha-data.dto';

export function fetchAllPages<DTOWrapper extends GachaDataPagedDTO<DTO>, DTO>(
  fetchPage: (offset: number) => Observable<DTOWrapper>,
  extractItems: (response: DTOWrapper) => DTO[],
): Observable<DTO[]> {
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
      (accumulatedResponse, latestResponse) =>
        accumulatedResponse.concat(latestResponse),
      [] as DTO[],
    ),
  );
}

export function validateResponse<DTOWrapper>(
  validate: (input: unknown) => IValidation<DTOWrapper>,
): (source: Observable<DTOWrapper>) => Observable<DTOWrapper> {
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

export function logTypiaValidationError(error: TypiaValidationError) {
  const errorMessage = error.validation.errors
    .map(
      (error) =>
        `Path: ${error.path}, Expected: ${error.expected}, Value: ${JSON.stringify(error.value)}`,
    )
    .join('; ');

  console.error(errorMessage);
}
