import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import type { IValidation } from 'typia';
import { ArknightsCharacter } from '../models/arknights-character.model';
import { GenshinImpactCharacter } from '../models/genshin-impact-character.model';
import { HonkaiStarRailCharacter } from '../models/honkai-star-rail-character.model';
import { HonkaiStarRailLightCone } from '../models/honkai-star-rail-light-cone.model';
import { GachaDataCache } from './gacha-data-cache';
import {
  validateArknightsCharacters,
  validateGenshinImpactCharacters,
  validateHonkaiStarRailCharacters,
  validateHonkaiStarRailLightCones,
} from './gacha-data-validator';
import {
  COLLECTIONS_DTO_IDS,
  ENDPOINTS,
  PAGE_SIZE,
} from './gacha-data.constants';
import { fetchAllPages, validateResponse } from './gacha-data.utils';
import { toArknightsCharacter } from './mappers/arknights.mapper';
import { toGenshinImpactCharacter } from './mappers/genshin-impact.mapper';
import {
  toHonkaiStarRailCharacter,
  toHonkaiStarRailLightCone,
} from './mappers/honkai-star-rail.mapper';
import { Collection, GachaDataResponse } from './models/gacha-data.dto';

@Service()
export class GachaData {
  protected readonly gachaDataCache = inject(GachaDataCache);
  protected readonly http = inject(HttpClient);

  getArknightsCharacters(): Observable<ArknightsCharacter[]> {
    return this.gachaDataCache.getCache('aCharacters', () =>
      this.getCollection(
        COLLECTIONS_DTO_IDS.characters,
        ENDPOINTS.arknights.characters,
        validateArknightsCharacters,
      ).pipe(map((response) => response.map(toArknightsCharacter))),
    );
  }

  getGenshinImpactCharacters(): Observable<GenshinImpactCharacter[]> {
    return this.gachaDataCache.getCache('gICharacters', () =>
      this.getCollection(
        COLLECTIONS_DTO_IDS.characters,
        ENDPOINTS.genshinImpact.characters,
        validateGenshinImpactCharacters,
      ).pipe(map((response) => response.map(toGenshinImpactCharacter))),
    );
  }

  getHonkaiStarRailCharacters(): Observable<HonkaiStarRailCharacter[]> {
    return this.gachaDataCache.getCache('hSRCharacters', () =>
      this.getCollection(
        COLLECTIONS_DTO_IDS.characters,
        ENDPOINTS.honkaiStarRail.characters,
        validateHonkaiStarRailCharacters,
      ).pipe(map((response) => response.map(toHonkaiStarRailCharacter))),
    );
  }

  getHonkaiStarRailLightCones(): Observable<HonkaiStarRailLightCone[]> {
    return this.gachaDataCache.getCache('hSRLightCones', () =>
      this.getCollection(
        COLLECTIONS_DTO_IDS.lightCones,
        ENDPOINTS.honkaiStarRail.lightCones,
        validateHonkaiStarRailLightCones,
      ).pipe(map((response) => response.map(toHonkaiStarRailLightCone))),
    );
  }

  private getCollection<P extends Collection, T>(
    collection: P,
    endpoint: string,
    validationInput: (input: unknown) => IValidation<GachaDataResponse<P, T>>,
  ): Observable<T[]> {
    return fetchAllPages(
      (offset) =>
        this.http
          .get<GachaDataResponse<P, T>>(`/api/${endpoint}`, {
            params: { offset, limit: PAGE_SIZE },
          })
          .pipe(validateResponse(validationInput)),
      (response) => response[collection],
    );
  }
}
