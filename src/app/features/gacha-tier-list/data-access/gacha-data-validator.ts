import typia from 'typia';
import { Characters, LightCones } from '../models/type-aliases.model';
import { ArknightsCharacterDTO } from './models/arknights-character.dto';
import { GachaDataResponse } from './models/gacha-data.dto';
import { GenshinImpactCharacterDTO } from './models/genshin-impact-character.dto';
import { HonkaiStarRailCharacterDTO } from './models/honkai-star-rail-character.dto';
import { HonkaiStarRailLightConeDTO } from './models/honkai-star-rail-light-cone.dto';

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
