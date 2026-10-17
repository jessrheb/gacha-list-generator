import {
  BaseStats,
  HonkaiStarRailPath,
  Rarity,
  UniversalFields,
} from './shared-gacha-vocabulary.model';
import { Hero } from './type-aliases.model';

export type HonkaiStarRailLightCone = Omit<UniversalFields, Hero> &
  BaseStats & {
    name: string;
    rarity: Extract<Rarity, 3 | 4 | 5>;
    path: HonkaiStarRailPath;
  };
