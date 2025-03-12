import { DEFAULT_DATA_CACHE_CONFIG } from "constants/index";
import { CacheError } from "errors";
import { JQLite } from "index";
import { DataCache as DataCacheConfigType } from "types/config";
import { CACHE_ERRORS } from "constants/errors";

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

  public getCacheForKey(key: string): string | Promise<string> | void {
    return this.cache.get(key);
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public clearCacheForKey(key: string): void {
    this.cache.delete(key);
  }

  public setCache(key: string, value: any): void {
    const cacheSize = this.getCacheSize();
    const cacheLimit = this.config.limit;
    if (cacheLimit && cacheSize > cacheLimit) {
      throw new CacheError(CACHE_ERRORS.LIMIT_EXCEEDED);
    }
    this.cache.set(key, value);
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

  public hasCacheExpired(): boolean {
    const expirationTime =
      this.jqlite.configManager.getConfig().dataCache?.expiration;
    if (!expirationTime) return false;
    const currentTime = new Date();
    return expirationTime < currentTime;
  }

  public removeExpiredCache(): void {
    if (this.hasCacheExpired()) this.cache.clear();
  }
}
