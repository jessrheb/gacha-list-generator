import { EMPTY, Observable, expand, map, reduce } from 'rxjs';
import { Category, GachaDataResponseDTO } from './models/gacha-data.dto';

export function fetchAllPages<T, K extends Category>(
  fetchPage: (offset: number) => Observable<GachaDataResponseDTO<T, K>>,
  category: K,
  initialOffset: number = 0,
): Observable<T[]> {
  const fetchWithOffset = (offset: number) =>
    fetchPage(offset).pipe(map((response) => ({ offset, response })));

  return fetchWithOffset(initialOffset).pipe(
    expand(({ offset, response }) => {
      const receivedSoFar = response[category].length;
      const nextOffset = (response.offset ?? offset) + receivedSoFar;

      return receivedSoFar > 0 && nextOffset < response.total ?
          fetchWithOffset(nextOffset)
        : EMPTY;
    }),
    reduce(
      (accumulator, { response }) => accumulator.concat(response[category]),
      [] as T[],
    ),
  );
}
