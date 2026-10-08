export type StringArray = string[];
export type NullableString = string | null;

export type Localized<Property extends string, LocalizedValue = string> = {
  [Key in Property]: LocalizedValue;
} & {
  [Key in `${Property}_ja` | `${Property}_ko`]?: LocalizedValue;
};

export type Name = 'name';

export type UniversalKeys = 'id' | 'icon' | 'hero';
export type BaseStatsKeys = 'hp' | 'atk' | 'def';

export type UniversalFields = Record<UniversalKeys, string>;
export type BaseStats = Record<BaseStatsKeys, number>;

export type Rarity = 1 | 2 | 3 | 4 | 5 | 6;

export type HSRPath =
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
