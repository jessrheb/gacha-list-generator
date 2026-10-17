export type Localized<Property extends string, LocalizedProperty = string> = {
  [Name in Property]: LocalizedProperty;
} & {
  [Name in `${Property}_ja` | `${Property}_ko`]?: LocalizedProperty;
};

export type CamelizedCacheKey<Endpoint> = {
  [Gacha in keyof Endpoint]: {
    [
      Collection in keyof Endpoint[Gacha]
    ]: `${Gacha & string}${Capitalize<Collection & string>}`;
  }[keyof Endpoint[Gacha]];
}[keyof Endpoint];
