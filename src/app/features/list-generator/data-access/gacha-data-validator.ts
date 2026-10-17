import typia from 'typia';
import { ArknightsCharacterDTO } from './models/arknights-character.dto';
import { GachaDataDTO, GachaDataPagedDTO } from './models/gacha-data.dto';
import { GenshinImpactCharacterDTO } from './models/genshin-impact-character.dto';
import { HonkaiStarRailCharacterDTO } from './models/honkai-star-rail-character.dto';
import { HonkaiStarRailLightConeDTO } from './models/honkai-star-rail-light-cone.dto';

export const validateArknightsCharacters =
  typia.createValidate<GachaDataPagedDTO<ArknightsCharacterDTO>>();

export const validateGenshinImpactCharacters =
  typia.createValidate<GachaDataPagedDTO<GenshinImpactCharacterDTO>>();

export const validateHonkaiStarRailCharacters =
  typia.createValidate<GachaDataPagedDTO<HonkaiStarRailCharacterDTO>>();

export const validateHonkaiStarRailLightCones =
  typia.createValidate<GachaDataDTO<HonkaiStarRailLightConeDTO>>();
