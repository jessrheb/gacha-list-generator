import {
  UniversalFields,
  Rarity,
  BaseStats,
  HonkaiStarRailPath,
} from '../../models/shared-vocabulary.model';
import { Localized } from './localization-helper.dto';
import { Name, Hero } from './type-aliases.dto';

export type HonkaiStarRailLightConeDTO = Localized<Name> &
  Omit<UniversalFields, Hero> &
  Extract<Rarity, 4 | 5> &
  BaseStats & { path: HonkaiStarRailPath };
