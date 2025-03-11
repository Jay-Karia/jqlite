import { DEFAULT_DATA_CACHE_CONFIG } from "constants/index";
import { JQLite } from "index";
import { DataCache as DataCacheConfigType } from "types/config";

export class DataCacheManager {
  private jqlite: JQLite;
  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
  }

  get config(): DataCacheConfigType {
    return (
      this.jqlite.configManager.getConfig().dataCache ||
      DEFAULT_DATA_CACHE_CONFIG
    );
  }

  set config(config: DataCacheConfigType | undefined) {
    this.jqlite.configManager.setConfig({ dataCache: config });
  }
}
