import { DEFAULT_DATA_CACHE_CONFIG } from "constants/index";
import { CacheError } from "errors";
import { JQLite } from "index";
import { DataCache as DataCacheConfigType } from "types/config";
import { DATA_CACHE_ERRORS } from "constants/errors";

export class DataCacheManager {
  private jqlite: JQLite;
  private cache: Map<string, string | Promise<string>> = new Map();

  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
  }

  get config(): DataCacheConfigType {
    return (
      this.jqlite.configManager.getConfig().dataCache ||
      DEFAULT_DATA_CACHE_CONFIG
    );
  }

  public getCache(): Map<string, any> {
    return this.cache;
  }

  /**
   * Get the cache value for a key
   * @param key The cache ket to get
   * @returns The cache value for the key
   */
  public getCacheForKey(key: string): string | Promise<string> | void {
    if (!this.cache.has(key)) throw new CacheError(DATA_CACHE_ERRORS.KEY_NOT_FOUND);
    return this.cache.get(key);
  }

  /**
   * Clear the cache for a specific key
   * @param key The key to clear the cache for
   */
  public clearCacheForKey(key: string): void {
    if (!this.cache.has(key)) throw new CacheError(DATA_CACHE_ERRORS.KEY_NOT_FOUND);
    this.cache.delete(key);
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
      throw new CacheError(DATA_CACHE_ERRORS.LIMIT_EXCEEDED);
    }
    this.cache.set(key, value);
  }

  /**
   * Returns whether the cache has expired
   * @returns Whether the cache has expired
   */
  public hasCacheExpired(): boolean {
    const expirationTime =
      this.jqlite.configManager.getConfig().dataCache?.expiration;
    if (!expirationTime) return false;
    const currentTime = new Date();
    return expirationTime < currentTime;
  }

  /**
   * Clears the cache if expired
   */
  public removeExpiredCache(): void {
    if (this.hasCacheExpired()) this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public getCacheKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  public isCacheEnabled(): boolean {
    return (
      this.jqlite.configManager.getConfig().dataCache?.type !== "none" || false
    );
  }

  public clearCache(): void {
    this.cache.clear();
  }
}
