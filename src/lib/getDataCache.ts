import { DataCacheManager } from "../cache/data";

/**
 * Get the data cache for a URL
 * @param url The URL to get the data cache for
 * @param dataCacheManager The data cache manager
 * @returns The data cache if found
 */
function getDataCache(
  url: string,
  dataCacheManager: DataCacheManager
): string | Promise<string> | void {
  const cacheType = dataCacheManager.config.type;

  switch (cacheType) {
    case "memory":
      try {
        return dataCacheManager.getCacheForKey(url);
      } catch {
        return;
      }
    default:
      return;
  }
}

export { getDataCache };
