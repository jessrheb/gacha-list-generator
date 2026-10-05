import {
  BaseStats,
  Localized,
  Name,
  Rarity,
  UniversalFields,
} from '../shared-types.dto';
import { HSRPath } from './honkai-star-rail-path.dto';

type Hero = 'hero';

export type HonkaiStarRailLightConeDTO = Localized<Name> &
  Omit<UniversalFields, Hero> &
  Extract<Rarity, 4 | 5> &
  BaseStats & { path: HSRPath };
