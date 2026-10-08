import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { fetchAllPages } from '../gacha-data.utils';
import { Category, GachaDataResponseDTO } from '../models/gacha-data.dto';
import {
  assertArknightsCharacters,
  assertGenshinImpactCharacters,
  assertHonkaiStarRailCharacters,
  assertHonkaiStarRailLightCones,
} from '../gacha-data-validator';
import { GACHA_IDS, CATEGORY_IDS } from '../gacha-data.constants';
import { ArknightsCharacterDTO } from '../models/arknights-characters.dto';
import { GenshinImpactCharacterDTO } from '../models/genshin-impact-characters.dto';
import { HonkaiStarRailCharacterDTO } from '../models/honkai-star-rail-characters.dto';
import { HonkaiStarRailLightConeDTO } from '../models/honkai-star-rail-light-cones.dto';

@Service()
export class GachaData {
  protected readonly http = inject(HttpClient);

  private readonly proxyBase: string = '/api';
  private readonly arknightsCharactersPath: string = `${GACHA_IDS.arknights}/${CATEGORY_IDS.characters}`;

  getArknightsCharacters(): Observable<ArknightsCharacterDTO[]> {
    return this.fetchFullData(
      this.arknightsCharactersPath,
      CATEGORY_IDS.characters,
      assertArknightsCharacters,
    );
  }

  getGenshinImpactCharacters(): Observable<GenshinImpactCharacterDTO[]> {
    return this.fetchFullData(
      `${GACHA_IDS.genshinImpact}/${CATEGORY_IDS.characters}`,
      CATEGORY_IDS.characters,
      assertGenshinImpactCharacters,
    );
  }

  getHonkaiStarRailCharacters(): Observable<HonkaiStarRailCharacterDTO[]> {
    return this.fetchFullData(
      `${GACHA_IDS.honkaiStarRail}/${CATEGORY_IDS.characters}`,
      CATEGORY_IDS.characters,
      assertHonkaiStarRailCharacters,
    );
  }

  getHonkaiStarRailLightCones(): Observable<HonkaiStarRailLightConeDTO[]> {
    return this.fetchFullData(
      `${GACHA_IDS.honkaiStarRail}/${CATEGORY_IDS.lightCones}`,
      CATEGORY_IDS.lightCones,
      assertHonkaiStarRailLightCones,
    );
  }

  private fetchFullData<T, K extends Category>(
    path: string,
    category: K,
    assert: (input: unknown) => T[],
  ): Observable<T[]> {
    return fetchAllPages<T, K>(
      (offset) =>
        this.http
          .get<GachaDataResponseDTO<T, K>>(`${this.proxyBase}/${path}`, {
            params: { offset, limit: 100 },
          })
          .pipe(
            map((response) => {
              const validated = assert(response[category]);
              return {
                ...response,
                [category]: validated,
              } as GachaDataResponseDTO<T, K>;
            }),
          ),
      category,
    );
  }
}
