import {
  ArknightsClass,
  ArknightsDetailSection,
  ArknightsPosition,
  ArknightsStats,
} from '../../models/arknights-character.model';
import {
  Rarity,
  UniversalFields,
} from '../../models/shared-gacha-vocabulary.model';
import {
  NullableString,
  Profile,
  StringArray,
} from '../../models/type-aliases.model';
import { Localized } from './localization-helper.dto';
import { Branch, Desc, DescLevels, Name } from './type-aliases.dto';

interface ArknightsSkillDetailsDTO
  extends Localized<Name | Desc>, Localized<DescLevels, StringArray> {
  maxLevel: number;
  slot: string;
}

type ArknightsProfileDTO = Localized<Profile>;

interface ArknightsTalentsDTO extends Localized<Name | Desc, NullableString> {
  desc: string;
}

interface ArknightsPotentialsDTO {
  name: string;
  meta: string;
}

type ArknightsModulesDTO = Localized<Name> & Omit<ArknightsPotentialsDTO, Name>;

export type ArknightsDetailSectionsDTO =
  | ArknightsDetailSection<'Talents', ArknightsTalentsDTO>
  | ArknightsDetailSection<'Potentials', ArknightsPotentialsDTO>
  | ArknightsDetailSection<'Modules', ArknightsModulesDTO>;

export interface ArknightsCharacterDTO
  extends UniversalFields, Localized<Name | Branch> {
  rarity: Rarity;
  class: ArknightsClass;
  position: ArknightsPosition;
  dpCost: number;
  blockCount: number;
  redeploy: number;
  skillDetails: ArknightsSkillDetailsDTO[];
  stats: ArknightsStats;
  recruitTags: StringArray;
  talents: ArknightsTalentsDTO[];
  potentials: StringArray;
  profile: ArknightsProfileDTO;
  detailSections: ArknightsDetailSectionsDTO[];
  avail?: string;
}
