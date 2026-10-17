import { Service } from '@angular/core';
import { get, set } from 'idb-keyval';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { GachaCacheEntry, CacheKey } from './models/gacha-data.dto';

@Service()
export class GachaDataCache {
  private static readonly TTL_MS = 24 * 60 * 60 * 1000;
  private static readonly CACHE_VERSION = 2;

  getCache<Collection>(
    name: CacheKey,
    fetch: () => Observable<Collection>,
  ): Observable<Collection> {
    const cacheKey = this.storageCacheKey(name);

    return from(this.read<Collection>(cacheKey)).pipe(
      switchMap((cachedCollection) =>
        cachedCollection !== undefined ?
          of(cachedCollection)
        : fetch().pipe(tap((data) => void this.write(cacheKey, data))),
      ),
    );
  }

  private storageCacheKey(name: CacheKey): string {
    return `${name}:v${GachaDataCache.CACHE_VERSION}`;
  }

  private async read<Collection>(
    cacheKey: string,
  ): Promise<Collection | undefined> {
    const entry = await get<GachaCacheEntry<Collection>>(cacheKey);
    if (!entry) return undefined;
    if (Date.now() - entry.cachedIn > GachaDataCache.TTL_MS) return undefined;
    return entry.data;
  }

  private async write<Collection>(
    cacheKey: string,
    data: Collection,
  ): Promise<void> {
    try {
      await set(cacheKey, {
        data,
        cachedIn: Date.now(),
      } satisfies GachaCacheEntry<Collection>);
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' || error.name === 'SecurityError')
      ) {
        return;
      }
      console.warn('Cache write failed', { cacheKey, error });
    }
  }
}
