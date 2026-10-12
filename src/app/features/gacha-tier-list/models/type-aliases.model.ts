import { COLLECTION_IDS } from '../data-access/gacha-data.constants';

export type StringArray = string[];
export type NullableString = string | null;

export type Hero = 'hero';

export type Talents = 'Talents';
export type Potentials = 'Potentials';
export type Modules = 'Modules';

export type Profile =
  'race' | 'birthplace' | 'birthday' | 'height' | 'combatExp' | 'intro';

export type Characters = typeof COLLECTION_IDS.characters;
export type LightCones = typeof COLLECTION_IDS.lightCones;
