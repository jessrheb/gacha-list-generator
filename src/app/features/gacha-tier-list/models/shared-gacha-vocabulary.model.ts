export type UniversalKeys = 'id' | 'icon' | 'hero';
export type BaseStatsKeys = 'hp' | 'atk' | 'def';

export type UniversalFields = Record<UniversalKeys, string>;
export type BaseStats = Record<BaseStatsKeys, number>;

export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

export type HonkaiStarRailPath =
  | 'Destruction'
  | 'Hunt'
  | 'The Hunt'
  | 'Erudition'
  | 'Harmony'
  | 'Nihility'
  | 'Preservation'
  | 'Abundance'
  | 'Remembrance'
  | 'Elation';
