import {
  BaseStats,
  HSRPath,
  Localized,
  Name,
  Rarity,
  UniversalFields,
} from './shared-types.dto';

type Hero = 'hero';

export type HonkaiStarRailLightConeDTO = Localized<Name> &
  Omit<UniversalFields, Hero> &
  Extract<Rarity, 4 | 5> &
  BaseStats & { path: HSRPath };
