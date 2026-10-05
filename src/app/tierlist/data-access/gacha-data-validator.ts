import typia from 'typia';
import { GACHA_IDENTIFIERS } from './gacha-data.constants';
import { ArknightsCharacterDTO } from './models/arknights-characters.dto';
import { CharacterDTOFor, GachaList } from './models/gacha-data.dto';
import { GenshinImpactCharacterDTO } from './models/genshin-impact-characters.dto';
import { HonkaiStarRailCharacterDTO } from './models/honkai-star-rail-characters.dto';

const assertArknights = typia.createAssert<ArknightsCharacterDTO[]>();
const assertGenshinImpact = typia.createAssert<GenshinImpactCharacterDTO[]>();
const assertHonkaiStarRail = typia.createAssert<HonkaiStarRailCharacterDTO[]>();

export const typeValidator: {
  [Gacha in GachaList]: (input: unknown) => CharacterDTOFor<Gacha>[];
} = {
  [GACHA_IDENTIFIERS.arknights]: assertArknights,
  [GACHA_IDENTIFIERS.genshinImpact]: assertGenshinImpact,
  [GACHA_IDENTIFIERS.honkaiStarRail]: assertHonkaiStarRail,
};
