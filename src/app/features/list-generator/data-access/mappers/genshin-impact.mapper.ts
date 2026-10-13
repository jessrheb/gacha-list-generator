import {
  GenshinImpactCharacter,
  GenshinImpactStats,
} from '../../models/genshin-impact-character.model';
import {
  GenshinImpactCharacterDTO,
  GenshinImpactStatsDTO,
} from '../models/genshin-impact-character.dto';

export function toGenshinImpactCharacter(
  DTO: GenshinImpactCharacterDTO,
): GenshinImpactCharacter {
  const {
    id,
    icon,
    hero,
    name,
    stats,
    curve_sel,
    rarity,
    weapon,
    element,
    nation,
    ascension,
    asc_stat,
  } = DTO;
  return {
    id,
    icon,
    hero,
    name,
    stats: toGenshinImpactStats(stats),
    curveSel: curve_sel,
    rarity,
    weapon,
    element,
    nation,
    ascension,
    ascStat: asc_stat,
  } satisfies GenshinImpactCharacter;
}

function toGenshinImpactStats(DTO: GenshinImpactStatsDTO): GenshinImpactStats {
  const {
    hp_base,
    hp_lv90,
    hp_lv90_curve,
    atk_base,
    atk_lv90,
    atk_lv90_curve,
    def_base,
    def_lv90,
    def_lv90_curve,
  } = DTO;
  return {
    hpBase: hp_base,
    hpLv90: hp_lv90,
    hpLv90Curve: hp_lv90_curve,
    atkBase: atk_base,
    atkLv90: atk_lv90,
    atkLv90Curve: atk_lv90_curve,
    defBase: def_base,
    defLv90: def_lv90,
    defLv90Curve: def_lv90_curve,
  } satisfies GenshinImpactStats;
}
