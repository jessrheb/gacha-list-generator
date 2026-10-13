export const OFFSET = 0;
export const PAGE_SIZE = 100;

export const GACHA_DTO_IDS = {
  arknights: 'arknights',
  honkaiStarRail: 'honkai-star-rail',
  genshinImpact: 'genshin-impact',
} as const;

export const COLLECTIONS_DTO_IDS = {
  characters: 'characters',
  lightCones: 'light-cones',
} as const;

export const ENDPOINTS = {
  arknights: {
    characters: `${GACHA_DTO_IDS.arknights}/${COLLECTIONS_DTO_IDS.characters}`,
  },
  genshinImpact: {
    characters: `${GACHA_DTO_IDS.genshinImpact}/${COLLECTIONS_DTO_IDS.characters}`,
  },
  honkaiStarRail: {
    characters: `${GACHA_DTO_IDS.honkaiStarRail}/${COLLECTIONS_DTO_IDS.characters}`,
    lightCones: `${GACHA_DTO_IDS.honkaiStarRail}/${COLLECTIONS_DTO_IDS.lightCones}`,
  },
} as const;
