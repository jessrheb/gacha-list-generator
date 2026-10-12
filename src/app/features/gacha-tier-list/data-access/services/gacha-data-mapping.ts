import { Service } from '@angular/core';
import {
  ArknightsDetailSectionsDTO,
  ArknightsCharacterDTO,
} from '../models/arknights-characters.dto';
import {
  ArknightsCharacter,
  ArknightsDetailSections,
} from '../../models/arknights-characters.model';

@Service()
export class GachaDataMapping {
  toArknightsCharacter(DTO: ArknightsCharacterDTO): ArknightsCharacter {
    const {
      id,
      icon,
      hero,
      name,
      branch,
      rarity,
      position,
      dpCost,
      blockCount,
      redeploy,
      stats,
      recruitTags,
      potentials,
      profile: { race, birthplace, birthday, height, combatExp, intro },
      avail,
    } = DTO;
    return {
      id,
      icon,
      hero,
      name,
      branch,
      rarity,
      class: DTO.class,
      position,
      dpCost,
      blockCount,
      redeploy,
      skillDetails: DTO.skillDetails.map((skillDetail) => ({
        name: skillDetail.name,
        desc: skillDetail.desc,
        descLevels: skillDetail.descLevels,
        slot: skillDetail.slot,
        maxLevel: skillDetail.maxLevel,
      })),
      stats,
      recruitTags,
      talents: DTO.talents.map((talents) => ({
        name: talents.name,
        desc: talents.desc,
      })),
      potentials,
      profile: { race, birthplace, birthday, height, combatExp, intro },
      detailSections: DTO.detailSections.map(this.toDetailSection),
      avail,
    };
  }

  toDetailSection(DTO: ArknightsDetailSectionsDTO): ArknightsDetailSections {
    switch (DTO.title) {
      case 'Talents': {
        const { title, sub, items } = DTO;
        return {
          title,
          sub,
          items: items.map(({ name, desc }) => ({ name, desc })),
        };
      }
      case 'Potentials':
      case 'Modules': {
        const { title, sub, items } = DTO;
        return {
          title,
          sub,
          items: items.map(({ name, meta }) => ({ name, meta })),
        };
      }
      default: {
        const _exhaustive: never = DTO;
        throw new Error(`Unhandled section: ${JSON.stringify(_exhaustive)}`);
      }
    }
  }
}
