import { RateLimitProperties } from './rate-limit.model';

export const GLOBAL_RATE_LIMIT_CONFIG: RateLimitProperties = {
  windows: [
    { maxRequests: 6, intervalDuration: 60_000 },
    { maxRequests: 180, intervalDuration: 86_400_000 },
  ],
  defaultBlockDuration: 60_000,
  appliesTo: (url) => url.startsWith('/api/'),
};
