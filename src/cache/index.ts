import { JQLite } from "index";
import { DataCacheManager } from "./data";

export class CacheManager {
  private jqlite: JQLite;
  public dataCache: DataCacheManager;

  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
    this.dataCache = new DataCacheManager(this.jqlite);
  }
}
