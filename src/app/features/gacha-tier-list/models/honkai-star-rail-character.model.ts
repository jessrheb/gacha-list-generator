import {
  BaseStats,
  HonkaiStarRailPath,
  Rarity,
  UniversalFields,
} from './shared-gacha-vocabulary.model';

export type HonkaiStarRailElement =
  'Physical' | 'Fire' | 'Ice' | 'Lightning' | 'Wind' | 'Quantum' | 'Imaginary';

export interface HonkaiStarRailStats extends BaseStats {
  spd: number;
  aggro: number;
  energy?: number;
}

export type HonkaiStarRailSkillSlot =
  'Basic ATK' | 'Skill' | 'Ultimate' | 'Talent' | 'Technique';

export interface HonkaiStarRailSkillDetails {
  name: string;
  desc: string;
  slot: HonkaiStarRailSkillSlot;
}

export interface HonkaiStarRailCharacter extends UniversalFields {
  name: string;
  rarity: Rarity;
  path: HonkaiStarRailPath;
  element: HonkaiStarRailElement;
  stats: HonkaiStarRailStats;
  skillDetails: HonkaiStarRailSkillDetails[];
}
