import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { EMPTY, expand, map, Observable, reduce } from 'rxjs';
import { typeValidator } from '../gacha-data-validator';
import {
  CharacterDTOFor,
  GachaDataResponseDTO,
  GachaList,
} from '../models/gacha-data.dto';

@Service()
export class GachaData {
  protected readonly http = inject(HttpClient);

  private readonly proxyBase = '/api';
  private readonly pageSize = 100;

  getAllCharacters<Gacha extends GachaList>(
    gachaTitle: Gacha,
  ): Observable<CharacterDTOFor<Gacha>[]> {
    return this.fetchPages(gachaTitle).pipe(
      expand((response) => {
        const nextOffset = response.offset + response.count;
        const done = response.count === 0 || nextOffset >= response.total;
        return done ? EMPTY : this.fetchPages(gachaTitle, nextOffset);
      }),
      reduce(
        (accumulator, response) => accumulator.concat(response.characters),
        [] as CharacterDTOFor<Gacha>[],
      ),
    );
  }

  private fetchPages<Gacha extends GachaList>(
    gachaTitle: Gacha,
    offset: number = 0,
  ): Observable<GachaDataResponseDTO<CharacterDTOFor<Gacha>>> {
    const params = new HttpParams()
      .set('limit', this.pageSize)
      .set('offset', offset);

    return this.http
      .get<GachaDataResponseDTO>(`${this.proxyBase}/${gachaTitle}/characters`, {
        params,
      })
      .pipe(
        map((response) => {
          return {
            ...response,
            characters: typeValidator[gachaTitle](response.characters),
          };
        }),
      );
  }
}
