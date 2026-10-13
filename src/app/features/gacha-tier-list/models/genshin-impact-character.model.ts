import {
  BaseStats,
  UniversalFields,
  Rarity,
} from './shared-gacha-vocabulary.model';

type Suffixed<T, Suffix extends string = 'Base' | 'Lv90' | 'Lv90Curve'> = {
  [K in keyof T as `${string & K}${Suffix}`]: T[K];
};

export type GenshinImpactStats = Suffixed<BaseStats>;

export type GenshinImpactWeapon =
  'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';

export type GenshinImpactElement =
  'Pyro' | 'Hydro' | 'Electro' | 'Cryo' | 'Anemo' | 'Geo' | 'Dendro';

export type GenshinImpactNation =
  | 'Mondstadt'
  | 'Liyue'
  | 'Inazuma'
  | 'Sumeru'
  | 'Fontaine'
  | 'Natlan'
  | 'Snezhnaya'
  | 'Nod-Krai'
  | 'Other';

export interface GenshinImpactAscension extends BaseStats {
  step: number;
  mora: number;
  bonus: number;
}

export type GenshinImpactAscensionStats =
  | 'HP%'
  | 'ATK%'
  | 'DEF%'
  | 'Elemental Mastery'
  | 'Energy Recharge'
  | 'CRIT Rate'
  | 'CRIT DMG'
  | 'Healing Bonus'
  | 'Physical DMG Bonus'
  | 'Pyro DMG Bonus'
  | 'Hydro DMG Bonus'
  | 'Electro DMG Bonus'
  | 'Cryo DMG Bonus'
  | 'Anemo DMG Bonus'
  | 'Geo DMG Bonus'
  | 'Dendro DMG Bonus';

export interface GenshinImpactCharacter extends UniversalFields {
  name: string;
  stats: GenshinImpactStats;
  curveSel: [number, number, number];
  rarity: Extract<Rarity, 4 | 5>;
  weapon: GenshinImpactWeapon;
  element?: GenshinImpactElement;
  nation?: GenshinImpactNation;
  ascension: GenshinImpactAscension[];
  ascStat: GenshinImpactAscensionStats;
}
