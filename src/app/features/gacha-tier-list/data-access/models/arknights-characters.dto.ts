import {
  BaseStats,
  Localized,
  Name,
  NullableString,
  Rarity,
  StringArray,
  UniversalFields,
} from './shared-types.dto';

type Desc = 'desc';
type DescLevels = 'descLevels';
type Branch = 'branch';
type Profile =
  'race' | 'birthplace' | 'birthday' | 'height' | 'combatExp' | 'intro';

type DetailSection<SectionTitle extends string, SectionItem> = {
  title: SectionTitle;
  sub: string;
  items: SectionItem[];
};

type AKClass =
  | 'Vanguard'
  | 'Guard'
  | 'Defender'
  | 'Sniper'
  | 'Specialist'
  | 'Medic'
  | 'Caster'
  | 'Supporter';

type AKPosition = 'Melee' | 'Ranged';

interface AKSkillDetails
  extends Localized<Name | Desc>, Localized<DescLevels, StringArray> {
  maxLevel: number;
  slot: string;
}

interface AKStats extends BaseStats {
  res: number;
  atkInterval: number;
}

type AKProfile = Localized<Profile>;

interface AKTalents extends Localized<Name | Desc, NullableString> {
  desc: string;
}

interface AKPotentials {
  name: string;
  meta: string;
}

type AKModules = Localized<Name> & Omit<AKPotentials, Name>;

type AKDetailSections =
  | DetailSection<'Talents', AKTalents>
  | DetailSection<'Potentials', AKPotentials>
  | DetailSection<'Modules', AKModules>;

export interface ArknightsCharacterDTO
  extends UniversalFields, Localized<Name | Branch> {
  rarity: Rarity;
  class: AKClass;
  position: AKPosition;
  dpCost: number;
  blockCount: number;
  redeploy: number;
  skillDetails: AKSkillDetails[];
  stats: AKStats;
  recruitTags: StringArray;
  talents: AKTalents[];
  potentials: StringArray;
  profile: AKProfile;
  detailSections: AKDetailSections[];
  avail?: string;
}
