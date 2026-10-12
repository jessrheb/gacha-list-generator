export type Localized<P extends string, L = string> = {
  [K in P]: L;
} & {
  [K in `${P}_ja` | `${P}_ko`]?: L;
};
