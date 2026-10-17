import { Service } from '@angular/core';
import { del, get, keys, set } from 'idb-keyval';
import {
  Observable,
  finalize,
  from,
  map,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { VERSION_SEPARATOR } from './gacha-data.constants';
import { CacheKey, GachaCacheEntry } from './models/gacha-data.dto';

@Service()
export class GachaDataCache {
  private static readonly TTL_MS = 24 * 60 * 60 * 1000;
  private static readonly CACHE_VERSION = 1;

  private readonly inFlight = new Map<string, Observable<unknown>>();
  private purgePromise: Promise<void> | null = null;

  getCache<Collection>(
    name: CacheKey,
    fetch: () => Observable<Collection>,
  ): Observable<Collection> {
    const cacheKey = this.storageCacheKey(name);

    const existing = this.inFlight.get(cacheKey);
    if (existing) return existing as Observable<Collection>;

    const stream$ = from(this.ensurePurged()).pipe(
      switchMap(() => from(this.read<Collection>(cacheKey))),
      switchMap((cached) =>
        cached !== undefined ?
          of(cached)
        : fetch().pipe(
            switchMap((data) =>
              from(this.write(cacheKey, data)).pipe(map(() => data)),
            ),
          ),
      ),
      finalize(() => this.inFlight.delete(cacheKey)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.inFlight.set(cacheKey, stream$);
    return stream$;
  }

  private ensurePurged(): Promise<void> {
    this.purgePromise ??= this.purgeOldVersions().catch((error) => {
      console.warn('Cache purge failed', { error });
    });
    return this.purgePromise;
  }

  private async purgeOldVersions(): Promise<void> {
    const currentSuffix = `${VERSION_SEPARATOR}${GachaDataCache.CACHE_VERSION}`;
    const allKeys = await keys();
    const stale = allKeys.filter(
      (key): key is string =>
        typeof key === 'string' &&
        key.includes(VERSION_SEPARATOR) &&
        !key.endsWith(currentSuffix),
    );
    if (stale.length === 0) return;
    await Promise.all(stale.map((key) => del(key)));
    console.info(`[cache] Purged ${stale.length} stale cache entries`);
  }

  private storageCacheKey(name: CacheKey): string {
    return `${name}${VERSION_SEPARATOR}${GachaDataCache.CACHE_VERSION}`;
  }

  private async read<Collection>(
    cacheKey: string,
  ): Promise<Collection | undefined> {
    const entry = await get<GachaCacheEntry<Collection>>(cacheKey);

    if (!entry) return undefined;

    if (Date.now() - entry.cachedIn > GachaDataCache.TTL_MS) {
      void del(cacheKey);
      return undefined;
    }

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
        error.name === 'QuotaExceededError'
      ) {
        console.warn('Cache quota exceeded — collection not persisted', {
          cacheKey,
          estimate: await navigator.storage?.estimate?.(),
        });
        return;
      }
      console.warn('Cache write failed', { cacheKey, error });
    }
  }
}
