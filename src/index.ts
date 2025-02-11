import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "lib/validate-data";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public data: string | object;

  /**
   * The constructor for JQLite
   * @param config The config object to override
   * @param data The JSON data or path to a JSON file
   */
  constructor(config?: Config, data?: string) {
    this.configManager = new ConfigManager(config);
    this.data = data ? validateData(data as string) : {};
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): void {
    this.data = validateData(data);
  }

  /**
   * Clears the data
   */
  public clearData(): void {
    this.data = {};
  }
}
