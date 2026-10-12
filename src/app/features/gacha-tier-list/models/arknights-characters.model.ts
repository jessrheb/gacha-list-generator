import { BaseStats, UniversalFields, Rarity } from './shared-vocabulary.model';
import { StringArray, Profile, NullableString } from './type-aliases.model';

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

export type ArknightsProfile = Record<Profile, string>;

export interface ArknightsTalents {
  name: NullableString;
  desc: string;
}

export interface ArknightsSharedItem {
  name: string;
  meta: string;
}

export type ArknightsDetailSections =
  | ArknightsDetailSection<'Talents', ArknightsTalents>
  | ArknightsDetailSection<'Potentials', ArknightsSharedItem>
  | ArknightsDetailSection<'Modules', ArknightsSharedItem>;

export interface ArknightsCharacter extends UniversalFields {
  name: string;
  branch: string;
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
