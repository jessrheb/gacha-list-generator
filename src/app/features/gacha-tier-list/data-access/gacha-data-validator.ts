import typia from 'typia';
import { GachaDataResponse } from './models/gacha-data.dto';
import { ArknightsCharacterDTO } from './models/arknights-characters.dto';
import { GenshinImpactCharacterDTO } from './models/genshin-impact-characters.dto';
import { HonkaiStarRailCharacterDTO } from './models/honkai-star-rail-characters.dto';
import { HonkaiStarRailLightConeDTO } from './models/honkai-star-rail-light-cones.dto';
import { COLLECTION_IDS } from './gacha-data.constants';

type Characters = typeof COLLECTION_IDS.characters;
type LightCones = typeof COLLECTION_IDS.lightCones;

export const validateArknightsCharacters =
  typia.createValidate<GachaDataResponse<Characters, ArknightsCharacterDTO>>();

export const validateGenshinImpactCharacters =
  typia.createValidate<
    GachaDataResponse<Characters, GenshinImpactCharacterDTO>
  >();

export const validateHonkaiStarRailCharacters =
  typia.createValidate<
    GachaDataResponse<Characters, HonkaiStarRailCharacterDTO>
  >();

export const validateHonkaiStarRailLightCones =
  typia.createValidate<
    GachaDataResponse<LightCones, HonkaiStarRailLightConeDTO>
  >();
