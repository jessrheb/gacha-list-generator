export const OFFSET = 0;
export const PAGE_SIZE = 100;
export const VERSION_SEPARATOR = '@v';

export const GACHA_KEYS = {
  arknights: 'arknights',
  honkaiStarRail: 'honkai-star-rail',
  genshinImpact: 'genshin-impact',
} as const;

export const COLLECTION_KEYS = {
  characters: 'characters',
  lightCones: 'light-cones',
} as const;

export const ENDPOINT_PATHS = {
  arknights: {
    characters: `${GACHA_KEYS.arknights}/${COLLECTION_KEYS.characters}`,
  },
  genshinImpact: {
    characters: `${GACHA_KEYS.genshinImpact}/${COLLECTION_KEYS.characters}`,
  },
  honkaiStarRail: {
    characters: `${GACHA_KEYS.honkaiStarRail}/${COLLECTION_KEYS.characters}`,
    lightCones: `${GACHA_KEYS.honkaiStarRail}/${COLLECTION_KEYS.lightCones}`,
  },
} as const;
