import { DEFAULT_DATA_CACHE_CONFIG } from "constants/index";
import { CacheError } from "errors";
import { JQLite } from "index";
import { DataCache as DataCacheConfigType } from "types/config";
import { CACHE_ERRORS } from "constants/errors";

export class DataCacheManager {
  private jqlite: JQLite;
  private cache: Map<string, string | Promise<string>> = new Map();

  /**
   * The constructor for the DataCacheManager
   * @param jqlite The JQLite instance
   */
  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
  }

  /**
   * Get the cache config
   * @returns The cache config
   */
  get config(): DataCacheConfigType {
    return (
      this.jqlite.configManager.getConfig().dataCache ||
      DEFAULT_DATA_CACHE_CONFIG
    );
  }

  /**
   * Get the cache
   * @returns The cache
   */
  public getCache(): Map<string, any> {
    return this.cache;
  }

  /**
   * Get the cache value for a key
   * @param key The cache ket to get
   * @returns The cache value for the key
   */
  public getCacheForKey(key: string): string | Promise<string> | void {
    if (!this.cache.has(key)) throw new CacheError(CACHE_ERRORS.KEY_NOT_FOUND);
    return this.cache.get(key);
  }

  /**
   * Clear the cache for a specific key
   * @param key The key to clear the cache for
   */
  public clearCacheForKey(key: string): void {
    if (!this.cache.has(key)) throw new CacheError(CACHE_ERRORS.KEY_NOT_FOUND);
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
      throw new CacheError(CACHE_ERRORS.LIMIT_EXCEEDED);
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

  /**
   * Sets the cache expiration
   * @param expiration The expiration date for the cache
   */
  public setCacheExpiration(expiration: Date) {
    this.jqlite.configManager.setConfig({
      dataCache: {
        ...this.config,
        expiration,
      },
    });
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
    return (
      this.jqlite.configManager.getConfig().dataCache?.type !== "none" || false
    );
  }

  /**
   * Clear the cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Reset the cache config
   */
  public resetConfig() {
    this.jqlite.configManager.setConfig({
      dataCache: DEFAULT_DATA_CACHE_CONFIG,
    });
  }
}
