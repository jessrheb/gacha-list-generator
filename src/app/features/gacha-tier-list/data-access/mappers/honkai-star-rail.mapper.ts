import { HonkaiStarRailCharacter } from '../../models/honkai-star-rail-character.model';
import { HonkaiStarRailLightCone } from '../../models/honkai-star-rail-light-cone.model';
import { HonkaiStarRailCharacterDTO } from '../models/honkai-star-rail-character.dto';
import { HonkaiStarRailLightConeDTO } from '../models/honkai-star-rail-light-cone.dto';

export function toHonkaiStarRailCharacter(
  DTO: HonkaiStarRailCharacterDTO,
): HonkaiStarRailCharacter {
  const { id, icon, hero, name, rarity, path, element, stats } = DTO;
  return {
    id,
    icon,
    hero,
    name,
    rarity,
    path,
    element,
    stats,
    skillDetails: DTO.skillDetails.map((skillDetail) => ({
      name: skillDetail.name,
      desc: skillDetail.desc,
      slot: skillDetail.slot,
    })),
  } satisfies HonkaiStarRailCharacter;
}

export function toHonkaiStarRailLightCone(
  DTO: HonkaiStarRailLightConeDTO,
): HonkaiStarRailLightCone {
  const { id, icon, name, hp, atk, def, rarity, path } = DTO;
  return {
    id,
    icon,
    name,
    hp,
    atk,
    def,
    rarity,
    path,
  } satisfies HonkaiStarRailLightCone;
}
