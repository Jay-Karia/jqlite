import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "validators/validate-data";
import { DataCacheManager } from "cache/data";
// import {resolveCacheData} from "lib/resolveCacheData";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public dataCacheManager: DataCacheManager;
  public data: string | Promise<string>;
  private currentDataUrl: string | null = null;

  set config(config: Config) {
    this.configManager.setConfig(config);
  }

  get config(): Config {
    return this.configManager.getConfig();
  }

  /**
   * The constructor for JQLite
   * @param config The config object to override
   * @param data The JSON data or path to a JSON file
   */
  constructor(config?: Config, data?: string) {
    this.configManager = new ConfigManager(config);
    this.dataCacheManager = new DataCacheManager(this);
    if (data && (data.startsWith("http://") || data.startsWith("https://"))) {
      this.currentDataUrl = data;
    }
    this.data = data ? validateData(data, this.dataCacheManager) : "{}";
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    if (data.startsWith("http://") || data.startsWith("https://")) {
      this.currentDataUrl = data;
    } else {
      this.currentDataUrl = null;
    }
    this.data = validateData(data, this.dataCacheManager);
    return {
      resolve: async () => {
        this.data = await this.data;
        if (this.currentDataUrl) {
          this.dataCacheManager.setCache(
            this.currentDataUrl,
            this.data as string
          );
        }
      },
    };
  }

  /**
   * Clears the data
   */
  public clearData(): void {
    this.data = "{}";
  }

  /**
   * Resolves the data if it is a promise
   */
  public async resolveData() {
    this.data = await this.data;
    if (this.currentDataUrl) {
      this.dataCacheManager.setCache(this.currentDataUrl, this.data as string);
    }
  }
}

const jqlite = new JQLite(
  {},
  "https://raw.githubusercontent.com/Jay-Karia/jqlite/refs/heads/main/data.json"
);
await jqlite.resolveData();

const cacheManager = jqlite.dataCacheManager;

console.log(cacheManager.getCache());

console.log(jqlite.data);
