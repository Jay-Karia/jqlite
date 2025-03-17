import { DEFAULT_DATA_CACHE_CONFIG } from "constants/index";
import { CacheError } from "errors";
import { DataCache as DataCacheConfigType } from "types/config";
import { CACHE_ERRORS } from "constants/errors";
import { getConfig, updateConfig } from "lib/globalConfig";

export class DataCacheManager {
  private cache: Map<string, string | Promise<string>> = new Map();

  /**
   * Get the cache config
   * @returns The cache config
   */
  get config(): DataCacheConfigType {
    return getConfig().dataCache || DEFAULT_DATA_CACHE_CONFIG;
  }

  /**
   * Get the cache
   * @returns The cache
   */
  public getCache(): Map<string, any> {
    // this.jqlite.eventManager.emit("CACHE_HIT");
    return this.cache;
  }

  /**
   * Get the cache value for a key
   * @param key The cache ket to get
   * @returns The cache value for the key
   */
  public getCacheForKey(key: string): string | Promise<string> | void {
    if (!this.cache.has(key)) throw new CacheError(CACHE_ERRORS.KEY_NOT_FOUND);
    // this.jqlite.eventManager.emit("CACHE_HIT");
    return this.cache.get(key);
  }

  /**
   * Clear the cache for a specific key
   * @param key The key to clear the cache for
   */
  public clearCacheForKey(key: string): void {
    if (!this.cache.has(key)) throw new CacheError(CACHE_ERRORS.KEY_NOT_FOUND);
    this.cache.delete(key);
    // this.jqlite.eventManager.emit("CACHE_CLEARED");
  }

  /**
   * Sets the cache for a key
   * @param key The key to set the cache for
   * @param value The value to set the cache for
   */
  public setCache(key: string, value: any): void {
    // check if the cache is enabled
    if (!this.isCacheEnabled()) return;

    // check for limit
    const cacheSize = this.getCacheSize();
    const cacheLimit = this.config.limit;
    if (cacheLimit && cacheSize > cacheLimit) {
      throw new CacheError(CACHE_ERRORS.LIMIT_EXCEEDED);
    }
    this.cache.set(key, value);
  }

  /**
   * Returns whether the cache has expired
   * @returns Whether the cache has expired
   */
  public hasCacheExpired(): boolean {
    const expirationTime = getConfig().dataCache?.expiration;
    if (!expirationTime) return false;
    const currentTime = new Date();
    const expired = expirationTime < currentTime;
    // if (expired) this.jqlite.eventManager.emit("CACHE_EXPIRED");
    return expired;
  }

  /**
   * Clears the cache if expired
   */
  public removeExpiredCache(): void {
    if (this.hasCacheExpired()) this.cache.clear();
    // this.jqlite.eventManager.emit("CACHE_CLEARED");
  }

  /**
   * Sets the cache expiration
   * @param expiration The expiration date for the cache
   */
  public setCacheExpiration(expiration: Date) {
    updateConfig({
      dataCache: {
        ...this.config,
        expiration,
      },
    });
    // this.jqlite.eventManager.emit("AFTER_SET_CONFIG");
  }

  /**
   * Get the cache strategy
   * @returns The cache strategy
   */
  public getCacheStrategy() {
    return this.config.type;
  }

  /**
   * Get the cache size
   * @returns The cache size
   */
  public getCacheSize(): number {
    return this.cache.size;
  }

  /**
   * Get the cache keys
   * @returns The cache keys
   */
  public getCacheKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get whether the cache is enabled
   * @returns Whether the cache is enabled
   */
  public isCacheEnabled(): boolean {
    return getConfig().dataCache?.type !== "none" || false;
  }

  /**
   * Clear the cache
   */
  public clearCache(): void {
    this.cache.clear();
    // this.jqlite.eventManager.emit("CACHE_CLEARED");
  }

  /**
   * Reset the cache config
   */
  public resetConfig() {
    updateConfig({
      dataCache: DEFAULT_DATA_CACHE_CONFIG,
    });
    // this.jqlite.eventManager.emit("AFTER_SET_CONFIG");
  }
}
