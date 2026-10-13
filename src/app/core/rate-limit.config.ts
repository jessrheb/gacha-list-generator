export interface RateLimitWindow {
  readonly maxRequests: number;
  readonly intervalDuration: number;
}

export interface WindowState {
  count: number;
  resetAt: number;
}

export interface RateLimitProperties {
  readonly windows: readonly RateLimitWindow[];
  readonly defaultBlockDuration: number;
  readonly appliesTo: (url: string) => boolean;
}

export interface RequestState {
  readonly windows: WindowState[];
  serverBlockedUntil: number;
}

export const GLOBAL_RATE_LIMIT_CONFIG: RateLimitProperties = {
  windows: [
    { maxRequests: 6, intervalDuration: 60_000 },
    { maxRequests: 180, intervalDuration: 86_400_000 },
  ],
  defaultBlockDuration: 60_000,
  appliesTo: (url) => url.startsWith('/api/'),
};
