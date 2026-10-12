export const OFFSET = 0;
export const PAGE_SIZE = 100;

export const GACHA_IDS = {
  arknights: 'arknights',
  honkaiStarRail: 'honkai-star-rail',
  genshinImpact: 'genshin-impact',
} as const;

export const COLLECTION_IDS = {
  characters: 'characters',
  lightCones: 'light-cones',
} as const;

export const ENDPOINT_PATHS = {
  arknights: {
    characters: `${GACHA_IDS.arknights}/${COLLECTION_IDS.characters}`,
  },
  genshinImpact: {
    characters: `${GACHA_IDS.genshinImpact}/${COLLECTION_IDS.characters}`,
  },
  honkaiStarRail: {
    characters: `${GACHA_IDS.honkaiStarRail}/${COLLECTION_IDS.characters}`,
    lightCones: `${GACHA_IDS.honkaiStarRail}/${COLLECTION_IDS.lightCones}`,
  },
} as const;
