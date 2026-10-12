import {
  BaseStats,
  Localized,
  Name,
  Rarity,
  UniversalFields,
} from './localization-helper.dto';

type Suffixed<
  BaseType,
  GISuffixes extends string = '_base' | '_lv90' | '_lv90_curve',
> = {
  [Key in keyof BaseType as `${string & Key}${GISuffixes}`]: BaseType[Key];
};

type GIStats = Suffixed<BaseStats>;

type GIWeapon = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';

type GIElement =
  'Pyro' | 'Hydro' | 'Electro' | 'Cryo' | 'Anemo' | 'Geo' | 'Dendro';

type GINation =
  | 'Mondstadt'
  | 'Liyue'
  | 'Inazuma'
  | 'Sumeru'
  | 'Fontaine'
  | 'Natlan'
  | 'Snezhnaya'
  | 'Nod-Krai'
  | 'Other';

interface GIAscension extends BaseStats {
  step: number;
  mora: number;
  bonus: number;
}

type GIAscensionStats =
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

export interface GenshinImpactCharacterDTO
  extends UniversalFields, Required<Localized<Name>> {
  stats: GIStats;
  curve_sel: [number, number, number];
  rarity: Extract<Rarity, 4 | 5>;
  weapon: GIWeapon;
  element: GIElement;
  nation: GINation;
  ascension: GIAscension[];
  asc_stat: GIAscensionStats;
}
