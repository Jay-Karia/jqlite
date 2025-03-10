import { JQLite } from "index";
import { DataCacheManager } from "./data";

export class CacheManager {
  private jqlite: JQLite;
  public dataCacheManager: DataCacheManager;

  constructor(jqlite: JQLite) {
    this.jqlite = jqlite;
    this.dataCacheManager = new DataCacheManager(this.jqlite);
  }
}
