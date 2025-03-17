import { Config } from "./config/config";
import { ConfigManager } from "./config/index";
import { validateData } from "validators/validate-data";
import { DataCacheManager } from "cache/data";
import { updateDataCache } from "lib/updateDataCache";
import { isValidUrl } from "lib/isValidUrl";
import { Options } from "types/options";
import { emit, eventManager } from "lib/globalEmitter";
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
    this.eventManager = eventManager;
    this.configManager = new ConfigManager(options?.config);
    this.dataCacheManager = new DataCacheManager();
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
    emit("GET_DATA");
    return this.data;
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    emit("BEFORE_SET_DATA");
    this.currentDataUrl = isValidUrl(data) ? data : undefined;
    this.data = validateData(data, this.dataCacheManager);
    emit("AFTER_SET_DATA");
    return {
      resolve: async () => this.resolveData(),
    };
  }

  /**
   * Clears the data
   */
  public clearData(): void {
    emit("BEFORE_CLEAR_DATA");
    this.data = "{}";
    emit("AFTER_CLEAR_DATA");
  }

  /**
   * Resolves the data if it is a promise
   */
  public async resolveData() {
    emit("BEFORE_RESOLVE_DATA");
    this.data = await this.data;
    updateDataCache(this.currentDataUrl, this.data, this.dataCacheManager);
    emit("AFTER_RESOLVE_DATA");
  }
}

const jqlite = new JQLite();
console.log(jqlite.config);
