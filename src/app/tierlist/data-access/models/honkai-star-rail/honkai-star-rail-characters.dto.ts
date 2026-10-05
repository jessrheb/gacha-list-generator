import {
  BaseStats,
  UniversalFields,
  Localized,
  Name,
  Rarity,
} from '../shared-types.dto';
import { HSRPath } from './honkai-star-rail-path.dto';

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
