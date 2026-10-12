import {
  BaseStats,
  UniversalFields,
  Rarity,
} from '../../models/shared-vocabulary.model';
import {
  StringArray,
  Profile,
  NullableString,
} from '../../models/type-aliases.model';
import { Localized } from './localization-helper.dto';
import { Name, Desc, DescLevels, Branch } from './type-aliases.dto';

export type ArknightsDetailSectionDTO<T extends string, I> = {
  title: T;
  sub: string;
  items: I[];
};

export type ArknightsClassDTO =
  | 'Vanguard'
  | 'Guard'
  | 'Defender'
  | 'Sniper'
  | 'Specialist'
  | 'Medic'
  | 'Caster'
  | 'Supporter';

export type ArknightsPositionDTO = 'Melee' | 'Ranged';

export interface ArknightsSkillDetailsDTO
  extends Localized<Name | Desc>, Localized<DescLevels, StringArray> {
  maxLevel: number;
  slot: string;
}

export interface ArknightsStatsDTO extends BaseStats {
  res: number;
  atkInterval: number;
}

export type ArknightsProfileDTO = Localized<Profile>;

export interface ArknightsTalentsDTO extends Localized<
  Name | Desc,
  NullableString
> {
  desc: string;
}

export interface ArknightsPotentialsDTO {
  name: string;
  meta: string;
}

export type ArknightsModulesDTO = Localized<Name> &
  Omit<ArknightsPotentialsDTO, Name>;

export type ArknightsDetailSectionsDTO =
  | ArknightsDetailSectionDTO<'Talents', ArknightsTalentsDTO>
  | ArknightsDetailSectionDTO<'Potentials', ArknightsPotentialsDTO>
  | ArknightsDetailSectionDTO<'Modules', ArknightsModulesDTO>;

export interface ArknightsCharacterDTO
  extends UniversalFields, Localized<Name | Branch> {
  rarity: Rarity;
  class: ArknightsClassDTO;
  position: ArknightsPositionDTO;
  dpCost: number;
  blockCount: number;
  redeploy: number;
  skillDetails: ArknightsSkillDetailsDTO[];
  stats: ArknightsStatsDTO;
  recruitTags: StringArray;
  talents: ArknightsTalentsDTO[];
  potentials: StringArray;
  profile: ArknightsProfileDTO;
  detailSections: ArknightsDetailSectionsDTO[];
  avail?: string;
}
