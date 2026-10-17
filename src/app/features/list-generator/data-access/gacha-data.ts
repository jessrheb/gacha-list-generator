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
import { ENDPOINT_PATHS, PAGE_SIZE } from './gacha-data.constants';
import { fetchAllPages, validateResponse } from './gacha-data.utils';
import { toArknightsCharacter } from './mappers/arknights.mapper';
import { toGenshinImpactCharacter } from './mappers/genshin-impact.mapper';
import {
  toHonkaiStarRailCharacter,
  toHonkaiStarRailLightCone,
} from './mappers/honkai-star-rail.mapper';
import { GachaDataDTO, GachaDataPagedDTO } from './models/gacha-data.dto';

@Service()
export class GachaData {
  protected readonly gachaDataCache = inject(GachaDataCache);
  protected readonly http = inject(HttpClient);

  getArknightsCharacters(): Observable<ArknightsCharacter[]> {
    return this.gachaDataCache.getCache('arknightsCharacters', () =>
      this.getPagedCollection(
        ENDPOINT_PATHS.arknights.characters,
        validateArknightsCharacters,
      ).pipe(map((response) => response.map(toArknightsCharacter))),
    );
  }

  getGenshinImpactCharacters(): Observable<GenshinImpactCharacter[]> {
    return this.gachaDataCache.getCache('genshinImpactCharacters', () =>
      this.getPagedCollection(
        ENDPOINT_PATHS.genshinImpact.characters,
        validateGenshinImpactCharacters,
      ).pipe(map((response) => response.map(toGenshinImpactCharacter))),
    );
  }

  getHonkaiStarRailCharacters(): Observable<HonkaiStarRailCharacter[]> {
    return this.gachaDataCache.getCache('honkaiStarRailCharacters', () =>
      this.getPagedCollection(
        ENDPOINT_PATHS.honkaiStarRail.characters,
        validateHonkaiStarRailCharacters,
      ).pipe(map((response) => response.map(toHonkaiStarRailCharacter))),
    );
  }

  getHonkaiStarRailLightCones(): Observable<HonkaiStarRailLightCone[]> {
    return this.gachaDataCache.getCache('honkaiStarRailLightCones', () =>
      this.getFullCollection(
        ENDPOINT_PATHS.honkaiStarRail.lightCones,
        validateHonkaiStarRailLightCones,
      ).pipe(map((response) => response.map(toHonkaiStarRailLightCone))),
    );
  }

  private getPagedCollection<DTO>(
    endpoint: string,
    validationInput: (input: unknown) => IValidation<GachaDataPagedDTO<DTO>>,
  ): Observable<DTO[]> {
    return fetchAllPages(
      (offset) =>
        this.http
          .get<GachaDataPagedDTO<DTO>>(`/api/${endpoint}`, {
            params: { offset, limit: PAGE_SIZE },
          })
          .pipe(validateResponse(validationInput)),
      (response) => response.characters,
    );
  }

  private getFullCollection<DTO>(
    endpoint: string,
    validationInput: (input: unknown) => IValidation<GachaDataDTO<DTO>>,
  ): Observable<DTO[]> {
    return this.http.get<GachaDataDTO<DTO>>(`api/${endpoint}`).pipe(
      validateResponse(validationInput),
      map((response) => response.data),
    );
  }
}
