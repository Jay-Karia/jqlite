import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "validators/validate-data";
import { DataCacheManager } from "cache/data";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public dataCacheManager: DataCacheManager;
  public data: string | Promise<string>;

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
    this.data = data ? validateData(data, this.dataCacheManager) : "{}";
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    this.data = validateData(data, this.dataCacheManager);
    return {
      resolve: async () => {
        this.data = await this.data;
        this.dataCacheManager.setCache(this.data, this.data);
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
    this.dataCacheManager.setCache(this.data, this.data);
  }
}

const jqlite = new JQLite(
  {},
  "https://raw.githubusercontent.com/Jay-Karia/jqlite/refs/heads/main/data.json"
);
await jqlite.resolveData();

console.log(jqlite.dataCacheManager.getCache());
console.log(jqlite.data);
