import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "validators/validate-data";
import { DataCacheManager } from "cache/data";
import { updateDataCache } from "lib/updateDataCache";
import { isValidUrl } from "lib/isValidUrl";
import { Options } from "types/options";
import { EventManager } from "hooks/eventManager";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public dataCacheManager: DataCacheManager;
  private data: string | Promise<string>;
  private currentDataUrl: string | undefined;
  public eventManager: EventManager;

  /**
   * The constructor for JQLite
   * @param config The config object to override
   * @param data The JSON data or path to a JSON file
   */
  constructor(options?: Options) {
    this.configManager = new ConfigManager(this, options?.config);
    this.eventManager = new EventManager();
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
   * Get the data
   */
  public getData(): string | Promise<string> {
    this.eventManager.emit("GET_DATA");
    return this.data;
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    this.eventManager.emit("BEFORE_SET_DATA");
    this.currentDataUrl = isValidUrl(data) ? data : undefined;
    this.data = validateData(data, this.dataCacheManager);
    this.eventManager.emit("AFTER_SET_DATA");
    return {
      resolve: async () => this.resolveData(),
    };
  }

  /**
   * Clears the data
   */
  public clearData(): void {
    this.eventManager.emit("BEFORE_CLEAR_DATA");
    this.data = "{}";
    this.eventManager.emit("AFTER_CLEAR_DATA");
  }

  /**
   * Resolves the data if it is a promise
   */
  public async resolveData() {
    this.eventManager.emit("BEFORE_RESOLVE_DATA");
    this.data = await this.data;
    updateDataCache(this.currentDataUrl, this.data, this.dataCacheManager);
    this.eventManager.emit("AFTER_RESOLVE_DATA");
  }
}
