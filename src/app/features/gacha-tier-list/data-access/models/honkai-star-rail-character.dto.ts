import {
  HonkaiStarRailPath,
  Rarity,
  UniversalFields,
} from '../../models/shared-gacha-vocabulary.model';
import {
  HonkaiStarRailElement,
  HonkaiStarRailSkillDetails,
  HonkaiStarRailStats,
} from '../../models/honkai-star-rail-character.model';
import { Localized } from './localization-helper.dto';
import { Name } from './type-aliases.dto';

interface HonkaiStarRailSkillDetailsDTO extends HonkaiStarRailSkillDetails {
  descLevels: [];
}

export interface HonkaiStarRailCharacterDTO
  extends UniversalFields, Localized<Name> {
  rarity: Rarity;
  path: HonkaiStarRailPath;
  element: HonkaiStarRailElement;
  stats: HonkaiStarRailStats;
  skillDetails: HonkaiStarRailSkillDetailsDTO[];
}
