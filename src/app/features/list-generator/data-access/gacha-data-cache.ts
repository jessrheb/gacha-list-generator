import { Service } from '@angular/core';
import { get, set } from 'idb-keyval';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { GachaCacheKey } from './models/gacha-data.dto';

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
}

@Service()
export class GachaDataCache {
  private static readonly TTL_MS = 24 * 60 * 60 * 1000;
  private static readonly CACHE_VERSION = 1;

  getCache<T>(name: GachaCacheKey, fetch: () => Observable<T>): Observable<T> {
    const key = this.storageKey(name);

    return from(this.read<T>(key)).pipe(
      switchMap((cached) =>
        cached !== undefined ?
          of(cached)
        : fetch().pipe(tap((data) => void this.write(key, data))),
      ),
    );
  }

  private storageKey(name: GachaCacheKey): string {
    return `${name}:v${GachaDataCache.CACHE_VERSION}`;
  }

  private async read<T>(key: string): Promise<T | undefined> {
    const entry = await get<CacheEntry<T>>(key);
    if (!entry) return undefined;
    if (Date.now() - entry.cachedAt > GachaDataCache.TTL_MS) return undefined;
    return entry.data;
  }

  private async write<T>(key: string, data: T): Promise<void> {
    try {
      await set(key, { data, cachedAt: Date.now() } satisfies CacheEntry<T>);
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' || error.name === 'SecurityError')
      ) {
        return;
      }
      console.warn('Cache write failed', { key, error });
    }
  }
}
