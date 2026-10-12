import { NullableString } from '../../models/type-aliases.model';
import { COLLECTION_IDS, GACHA_IDS } from '../gacha-data.constants';

export type Gacha = (typeof GACHA_IDS)[keyof typeof GACHA_IDS];
export type Collection = (typeof COLLECTION_IDS)[keyof typeof COLLECTION_IDS];

export interface GlobalGachaDataDTO {
  count: number;
  game: Gacha;
  limit: number;
  offset: number;
  sort: NullableString;
  total: number;
  _attribution: string;
}

export type GachaDataResponse<K extends Collection, T> = GlobalGachaDataDTO &
  Record<K, T[]>;
