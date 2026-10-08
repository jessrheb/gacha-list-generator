import {
  BaseStats,
  HSRPath,
  Localized,
  Name,
  Rarity,
  UniversalFields,
} from './shared-types.dto';

type HSRElement =
  'Physical' | 'Fire' | 'Ice' | 'Lightning' | 'Wind' | 'Quantum' | 'Imaginary';

interface HSRStats extends BaseStats {
  spd: number;
  aggro: number;
  energy?: number;
}

type HSRSkillSlot = 'Basic ATK' | 'Skill' | 'Ultimate' | 'Talent' | 'Technique';

interface HSRSkillDetails {
  name: string;
  slot: HSRSkillSlot;
  desc: string;
  descLevels: [];
}

export interface HonkaiStarRailCharacterDTO
  extends UniversalFields, Localized<Name> {
  rarity: Rarity;
  path: HSRPath;
  element: HSRElement;
  stats: HSRStats;
  skillDetails: HSRSkillDetails[];
}
