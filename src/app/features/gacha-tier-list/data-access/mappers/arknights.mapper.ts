import {
  ArknightsCharacter,
  ArknightsDetailSections,
} from '../../models/arknights-character.model';
import {
  ArknightsCharacterDTO,
  ArknightsDetailSectionsDTO,
} from '../models/arknights-character.dto';

export function toArknightsCharacter(
  DTO: ArknightsCharacterDTO,
): ArknightsCharacter {
  const {
    id,
    icon,
    hero,
    name,
    branch,
    rarity,
    class: arknightsClass,
    position,
    dpCost,
    blockCount,
    redeploy,
    skillDetails,
    stats,
    recruitTags,
    talents,
    potentials,
    profile,
    detailSections,
    avail,
  } = DTO;
  return {
    id,
    icon,
    hero,
    name,
    branch,
    rarity,
    class: arknightsClass,
    position,
    dpCost,
    blockCount,
    redeploy,
    skillDetails:
      skillDetails?.map((skillDetail) => ({
        name: skillDetail.name,
        desc: skillDetail.desc,
        descLevels: skillDetail.descLevels,
        slot: skillDetail.slot,
        maxLevel: skillDetail.maxLevel,
      })) ?? [],
    stats,
    recruitTags,
    talents: talents.map((talent) => ({
      name: talent.name,
      desc: talent.desc,
    })),
    potentials: potentials ?? [],
    profile: profile ?? {},
    detailSections: detailSections.map(toArknightsDetailSection),
    avail,
  } satisfies ArknightsCharacter;
}

function toArknightsDetailSection(
  DTO: ArknightsDetailSectionsDTO,
): ArknightsDetailSections {
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
