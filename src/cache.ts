import { JQLite } from "index";
import { DataCache } from "types/config";

export class CacheManager {
  private jqlite: JQLite;

  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
  }

  get config(): DataCache | undefined {
    return this.jqlite.configManager.config.dataCache;
  }

  set config(config: DataCache | undefined) {
    this.jqlite.configManager.set({ dataCache: config });
  }
}
