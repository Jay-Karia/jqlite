import { DataCacheManager } from "cache/data";

/**
 * Updates the data cache
 * @param dataUrl The URL to update the cache for
 * @param data The data to update the cache with
 * @param dataCacheManager The data cache manager
 */
function updateDataCache(
  dataUrl: string | undefined,
  data: string,
  dataCacheManager: DataCacheManager
) {
  if (dataUrl) {
    dataCacheManager.setCache(dataUrl, data);
  }
}

export { updateDataCache };
