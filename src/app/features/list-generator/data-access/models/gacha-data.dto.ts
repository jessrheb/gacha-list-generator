import { NullableString } from '../../models/type-aliases.model';
import {
  COLLECTION_KEYS,
  ENDPOINT_PATHS,
  GACHA_KEYS,
} from '../gacha-data.constants';
import { CamelizedCacheKey } from './helper-types.dto';

export type Gacha = (typeof GACHA_KEYS)[keyof typeof GACHA_KEYS];
export type Collection = (typeof COLLECTION_KEYS)[keyof typeof COLLECTION_KEYS];
export type CacheKey = CamelizedCacheKey<typeof ENDPOINT_PATHS>;

interface GachaDataBaseDTO {
  game: Gacha;
  _attribution: string;
}

export interface GachaDataPagedDTO<CharacterDTO> extends GachaDataBaseDTO {
  characters: CharacterDTO[];
  count: number;
  limit: number;
  offset: number;
  sort: NullableString;
  total: number;
}

export interface GachaDataDTO<CollectionDTO> extends GachaDataBaseDTO {
  data: CollectionDTO[];
  dataset: Collection;
}

export interface GachaCacheEntry<Type> {
  data: Type;
  cachedIn: number;
  version: number;
}
