import { NullableString } from '../../models/type-aliases.model';
import { COLLECTIONS_DTO_IDS, GACHA_DTO_IDS } from '../gacha-data.constants';

export type Gacha = (typeof GACHA_DTO_IDS)[keyof typeof GACHA_DTO_IDS];
export type Collection =
  (typeof COLLECTIONS_DTO_IDS)[keyof typeof COLLECTIONS_DTO_IDS];

export interface GlobalGachaDataDTO {
  count: number;
  game: Gacha;
  limit: number;
  offset: number;
  sort: NullableString;
  total: number;
  _attribution: string;
}

export type GachaDataResponse<P extends Collection, T> = GlobalGachaDataDTO &
  Record<P, T[]>;

export type GachaCacheKey =
  'aCharacters' | 'gICharacters' | 'hSRCharacters' | 'hSRLightCones';
