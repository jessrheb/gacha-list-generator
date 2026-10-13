export interface RateLimitWindow {
  readonly maxRequests: number;
  readonly intervalDuration: number;
}

export interface RateLimitProperties {
  readonly windows: readonly RateLimitWindow[];
  readonly defaultBlockDuration: number;
  readonly appliesTo: (url: string) => boolean;
}

export interface WindowState {
  count: number;
  resetAt: number;
}

export interface RequestState {
  readonly windows: WindowState[];
  serverBlockedUntil: number;
}
