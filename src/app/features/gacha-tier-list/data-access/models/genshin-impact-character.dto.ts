import {
  BaseStats,
  Rarity,
  UniversalFields,
} from '../../models/shared-gacha-vocabulary.model';
import {
  GenshinImpactAscension,
  GenshinImpactAscensionStats,
  GenshinImpactElement,
  GenshinImpactNation,
  GenshinImpactWeapon,
} from '../../models/genshin-impact-character.model';
import { Localized } from './localization-helper.dto';
import { Name } from './type-aliases.dto';

type SuffixedDTO<
  T,
  Suffix extends string = '_base' | '_lv90' | '_lv90_curve',
> = {
  [K in keyof T as `${string & K}${Suffix}`]: T[K];
};

export type GenshinImpactStatsDTO = SuffixedDTO<BaseStats>;

export interface GenshinImpactCharacterDTO
  extends UniversalFields, Required<Localized<Name>> {
  stats: GenshinImpactStatsDTO;
  curve_sel: [number, number, number];
  rarity: Extract<Rarity, 4 | 5>;
  weapon: GenshinImpactWeapon;
  element: GenshinImpactElement;
  nation: GenshinImpactNation;
  ascension: GenshinImpactAscension[];
  asc_stat: GenshinImpactAscensionStats;
}
