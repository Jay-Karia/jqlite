import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "validators/validate-data";
import { DataCacheManager } from "cache/data";
import { updateDataCache } from "lib/updateDataCache";
import { isValidUrl } from "lib/isValidUrl";
// import {resolveCacheData} from "lib/resolveCacheData";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public dataCacheManager: DataCacheManager;
  public data: string | Promise<string>;
  private currentDataUrl: string | undefined;

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
    this.currentDataUrl = isValidUrl(data) ? data : undefined;
    this.data = data ? validateData(data, this.dataCacheManager) : "{}";
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    this.currentDataUrl = isValidUrl(data) ? data : undefined;
    this.data = validateData(data, this.dataCacheManager);
    return {
      resolve: async () => {
        this.data = await this.data;
        updateDataCache(
          this.currentDataUrl,
          this.data as string,
          this.dataCacheManager
        );
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
    updateDataCache(
      this.currentDataUrl,
      this.data as string,
      this.dataCacheManager
    );
  }
}
