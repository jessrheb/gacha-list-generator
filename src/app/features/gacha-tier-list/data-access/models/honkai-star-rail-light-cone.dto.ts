import {
  BaseStats,
  HonkaiStarRailPath,
  Rarity,
  UniversalFields,
} from '../../models/shared-gacha-vocabulary.model';
import { Hero } from '../../models/type-aliases.model';
import { Localized } from './localization-helper.dto';
import { Name } from './type-aliases.dto';

export type HonkaiStarRailLightConeDTO = Localized<Name> &
  Omit<UniversalFields, Hero> &
  BaseStats & { rarity: Extract<Rarity, 4 | 5>; path: HonkaiStarRailPath };
