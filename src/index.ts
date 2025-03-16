import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "validators/validate-data";
import { DataCacheManager } from "cache/data";
import { updateDataCache } from "lib/updateDataCache";
import { isValidUrl } from "lib/isValidUrl";
import {Options} from "types/options";
import {eventManager} from "hooks/index";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public dataCacheManager: DataCacheManager;
  public data: string | Promise<string>;
  private currentDataUrl: string | undefined;

  /**
   * The constructor for JQLite
   * @param config The config object to override
   * @param data The JSON data or path to a JSON file
   */
  constructor(options?: Options) {
    this.configManager = new ConfigManager(options?.config);
    this.dataCacheManager = new DataCacheManager(this);
    this.currentDataUrl = isValidUrl(options?.data) ? options?.data : undefined;
    this.data = options?.data
      ? validateData(options.data, this.dataCacheManager)
      : "{}";
  }

  /**
   * Set the config
   */
  set config(config: Config) {
    this.configManager.setConfig(config);
  }

  /**
   * Get the config
   */
  get config(): Config {
    return this.configManager.getConfig();
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    this.currentDataUrl = isValidUrl(data) ? data : undefined;
    this.data = validateData(data, this.dataCacheManager);
    return {
      resolve: async () => this.resolveData(),
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
    updateDataCache(this.currentDataUrl, this.data, this.dataCacheManager);
  }
}

const jqlite = new JQLite();

console.log(jqlite.config);
