import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import type { IValidation } from 'typia';
import { ArknightsCharacter } from '../../models/arknights-characters.model';
import {
  validateArknightsCharacters,
  validateGenshinImpactCharacters,
} from '../gacha-data-validator';
import {
  COLLECTION_IDS,
  ENDPOINT_PATHS,
  PAGE_SIZE,
} from '../gacha-data.constants';
import { fetchAllPages, validateResponse } from '../gacha-data.utils';
import { Collection, GachaDataResponse } from '../models/gacha-data.dto';
import { GachaDataMapping } from './gacha-data-mapping';

@Service()
export class GachaData {
  protected readonly http = inject(HttpClient);
  protected readonly gachaDataMappingService = inject(GachaDataMapping);

  getArknightsCharacters(): Observable<ArknightsCharacter[]> {
    return this.getCollection(
      COLLECTION_IDS.characters,
      ENDPOINT_PATHS.arknights.characters,
      validateArknightsCharacters,
    ).pipe(
      map((DTO) => DTO.map(this.gachaDataMappingService.toArknightsCharacter)),
    );
  }

  private getCollection<K extends Collection, T>(
    collection: K,
    endpointPath: string,
    validationInput: (input: unknown) => IValidation<GachaDataResponse<K, T>>,
  ): Observable<T[]> {
    return fetchAllPages(
      (offset) =>
        this.http
          .get<GachaDataResponse<K, T>>(`/api/${endpointPath}`, {
            params: { offset, limit: PAGE_SIZE },
          })
          .pipe(validateResponse(validationInput)),
      (response) => response[collection],
    );
  }
}
