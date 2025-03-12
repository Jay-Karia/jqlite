import { DataCacheManager } from "cache/data";

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
