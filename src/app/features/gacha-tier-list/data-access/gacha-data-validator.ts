import typia from 'typia';
import { ArknightsCharacterDTO } from './models/arknights-characters.dto';
import { GenshinImpactCharacterDTO } from './models/genshin-impact-characters.dto';
import { HonkaiStarRailCharacterDTO } from './models/honkai-star-rail-characters.dto';
import { HonkaiStarRailLightConeDTO } from './models/honkai-star-rail-light-cones.dto';

export const assertArknightsCharacters =
  typia.createAssert<ArknightsCharacterDTO[]>();

export const assertGenshinImpactCharacters =
  typia.createAssert<GenshinImpactCharacterDTO[]>();

export const assertHonkaiStarRailCharacters =
  typia.createAssert<HonkaiStarRailCharacterDTO[]>();

export const assertHonkaiStarRailLightCones =
  typia.createAssert<HonkaiStarRailLightConeDTO[]>();
