import { DEFAULT_DATA_CACHE_CONFIG } from "constants/index";
import { JQLite } from "index";
import { DataCache as DataCacheConfigType } from "types/config";

export class DataCacheManager {
  private jqlite: JQLite;
  private cache: Map<string, any> = new Map();

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

  public getCacheForKey(key: string): any {
    return this.cache.get(key);
  }


  public clearCache(): void {
    this.cache.clear();
  }

  public clearCacheForKey(key: string): void {
    this.cache.delete(key);
  }

  public setCache(key: string, value: any): void {
    this.cache.set(key, value);
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public getCacheKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  public isCacheEnabled(): boolean {
    return this.jqlite.configManager.getConfig().dataCache?.enabled || false;
  }

}
