import { COLLECTIONS_DTO_IDS } from '../data-access/gacha-data.constants';

export type StringArray = string[];
export type NullableString = string | null;

export type Hero = 'hero';

export type Talents = 'Talents';
export type Potentials = 'Potentials';
export type Modules = 'Modules';

export type Profile =
  'race' | 'birthplace' | 'birthday' | 'height' | 'combatExp' | 'intro';

export type Characters = typeof COLLECTIONS_DTO_IDS.characters;
export type LightCones = typeof COLLECTIONS_DTO_IDS.lightCones;
