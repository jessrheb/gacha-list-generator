import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable, retry, timer } from 'rxjs';
import type { IValidation } from 'typia';
import { ArknightsCharacter } from '../models/arknights-character.model';
import { GenshinImpactCharacter } from '../models/genshin-impact-character.model';
import { HonkaiStarRailCharacter } from '../models/honkai-star-rail-character.model';
import { HonkaiStarRailLightCone } from '../models/honkai-star-rail-light-cone.model';
import {
  validateArknightsCharacters,
  validateGenshinImpactCharacters,
  validateHonkaiStarRailCharacters,
  validateHonkaiStarRailLightCones,
} from './gacha-data-validator';
import {
  COLLECTION_IDS,
  ENDPOINT_PATHS,
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
  protected readonly http = inject(HttpClient);

  getArknightsCharacters(): Observable<ArknightsCharacter[]> {
    return this.getCollection(
      COLLECTION_IDS.characters,
      ENDPOINT_PATHS.arknights.characters,
      validateArknightsCharacters,
    ).pipe(map((DTO) => DTO.map(toArknightsCharacter)));
  }

  getGenshinImpactCharacters(): Observable<GenshinImpactCharacter[]> {
    return this.getCollection(
      COLLECTION_IDS.characters,
      ENDPOINT_PATHS.genshinImpact.characters,
      validateGenshinImpactCharacters,
    ).pipe(map((DTO) => DTO.map(toGenshinImpactCharacter)));
  }

  getHonkaiStarRailCharacters(): Observable<HonkaiStarRailCharacter[]> {
    return this.getCollection(
      COLLECTION_IDS.characters,
      ENDPOINT_PATHS.honkaiStarRail.characters,
      validateHonkaiStarRailCharacters,
    ).pipe(map((DTO) => DTO.map(toHonkaiStarRailCharacter)));
  }

  getHonkaiStarRailLightCones(): Observable<HonkaiStarRailLightCone[]> {
    return this.getCollection(
      COLLECTION_IDS.lightCones,
      ENDPOINT_PATHS.honkaiStarRail.lightCones,
      validateHonkaiStarRailLightCones,
    ).pipe(map((DTO) => DTO.map(toHonkaiStarRailLightCone)));
  }

  private getCollection<P extends Collection, T>(
    collection: P,
    endpointPath: string,
    validationInput: (input: unknown) => IValidation<GachaDataResponse<P, T>>,
  ): Observable<T[]> {
    return fetchAllPages(
      (offset) =>
        this.http
          .get<GachaDataResponse<P, T>>(`/api/${endpointPath}`, {
            params: { offset, limit: PAGE_SIZE },
          })
          .pipe(
            retry({
              count: 3,
              delay: (error, retryCount) => {
                const retryAfter =
                  error?.error?.retryAfterMs ?? 2 ** retryCount * 1000;
                return timer(retryAfter);
              },
              resetOnSuccess: true,
            }),
            validateResponse(validationInput),
          ),
      (response) => response[collection],
    );
  }
}
