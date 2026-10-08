import { CATEGORY_IDS, GACHA_IDS } from '../gacha-data.constants';
import { NullableString } from './shared-types.dto';

export type GachaList = (typeof GACHA_IDS)[keyof typeof GACHA_IDS];
export type Category = (typeof CATEGORY_IDS)[keyof typeof CATEGORY_IDS];

export interface GachaDataDTO {
  count: number;
  game: GachaList;
  limit: number;
  offset: number;
  sort: NullableString;
  total: number;
  _attribution: string;
}

export type GachaDataResponseDTO<T, K extends Category> = Record<K, T[]> &
  GachaDataDTO;
