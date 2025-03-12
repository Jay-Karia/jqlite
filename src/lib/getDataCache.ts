import { DataCacheManager } from "../cache/data";

function getDataCache(
  url: string,
  dataCacheManager: DataCacheManager
): string | void {
  const cacheType = dataCacheManager.config.type;

  switch (cacheType) {
    case "memory":
      return dataCacheManager.getCacheForKey(url);
    default:
      return;
  }
}

export { getDataCache };
