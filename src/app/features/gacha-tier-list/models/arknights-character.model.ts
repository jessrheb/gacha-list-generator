import {
  BaseStats,
  Rarity,
  UniversalFields,
} from './shared-gacha-vocabulary.model';
import {
  Hero,
  Modules,
  NullableString,
  Potentials,
  Profile,
  StringArray,
  Talents,
} from './type-aliases.model';

export type ArknightsDetailSection<T extends string, I> = {
  title: T;
  sub: string;
  items: I[];
};

export type ArknightsClass =
  | 'Vanguard'
  | 'Guard'
  | 'Defender'
  | 'Sniper'
  | 'Specialist'
  | 'Medic'
  | 'Caster'
  | 'Supporter';

export type ArknightsPosition = 'Melee' | 'Ranged';

export interface ArknightsSkillDetails {
  name: string;
  desc: string;
  descLevels: StringArray;
  maxLevel: number;
  slot: string;
}

export interface ArknightsStats extends BaseStats {
  res: number;
  atkInterval: number;
}

export type ArknightsProfile = Partial<Record<Profile, string>>;

export interface ArknightsTalents {
  name: NullableString;
  desc: string;
}

export interface ArknightsDetailSectionItem {
  name: string;
  meta: string;
}

export type ArknightsDetailSections =
  | ArknightsDetailSection<Talents, ArknightsTalents>
  | ArknightsDetailSection<Potentials, ArknightsDetailSectionItem>
  | ArknightsDetailSection<Modules, ArknightsDetailSectionItem>;

export interface ArknightsCharacter extends Omit<UniversalFields, Hero> {
  name: string;
  branch: string;
  hero?: string;
  rarity: Rarity;
  class: ArknightsClass;
  position: ArknightsPosition;
  dpCost: number;
  blockCount: number;
  redeploy: number;
  skillDetails: ArknightsSkillDetails[];
  stats: ArknightsStats;
  recruitTags: StringArray;
  talents: ArknightsTalents[];
  potentials: StringArray;
  profile: ArknightsProfile;
  detailSections: ArknightsDetailSections[];
  avail?: string;
}
