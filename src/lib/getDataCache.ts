import { DataCacheManager } from "../cache/data";

function getDataCache(
  url: string,
  dataCacheManager: DataCacheManager
): string | Promise<string> | void {
  const cacheType = dataCacheManager.config.type;

  console.log(cacheType);
  // switch (cacheType) {
  //   case "memory":
  //     return dataCacheManager.get(url);
  //   default:
  //     return;
  // }
}

export { getDataCache };
