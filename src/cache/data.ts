import { JQLite } from "index";
import { DataCache as DataCacheConfigType } from "types/config";

export class DataCacheManager {
  private jqlite: JQLite;
  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
  }

  get config(): DataCacheConfigType | undefined {
    return this.jqlite.ConfigManager.getConfig().dataCache;
  }

  set config(config: DataCacheConfigType | undefined) {
    this.jqlite.ConfigManager.setConfig({ dataCache: config });
  }
}
