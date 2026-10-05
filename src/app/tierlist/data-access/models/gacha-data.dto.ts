import { GACHA_IDENTIFIERS } from '../gacha-data.constants';
import { ArknightsCharacterDTO } from './arknights-characters.dto';
import { GenshinImpactCharacterDTO } from './genshin-impact-characters.dto';
import { HonkaiStarRailCharacterDTO } from './honkai-star-rail/honkai-star-rail-characters.dto';
import { NullableString } from './shared-types.dto';

interface GachaCharacterDTOMap {
  [GACHA_IDENTIFIERS.arknights]: ArknightsCharacterDTO;
  [GACHA_IDENTIFIERS.genshinImpact]: GenshinImpactCharacterDTO;
  [GACHA_IDENTIFIERS.honkaiStarRail]: HonkaiStarRailCharacterDTO;
}

export type GachaList = keyof GachaCharacterDTOMap;
export type CharacterDTOFor<Gacha extends GachaList> =
  GachaCharacterDTOMap[Gacha];

export interface GachaDataResponseDTO<
  DTO extends GachaCharacterDTOMap[GachaList] = GachaCharacterDTOMap[GachaList],
> {
  _attribution: string;
  characters: DTO[];
  dataset?: string;
  count: number;
  game: GachaList;
  limit: number;
  offset: number;
  sort: NullableString;
  total: number;
}
