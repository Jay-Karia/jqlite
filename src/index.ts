import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "lib/validate-data";
import { DataError } from "utils/errors";
import { DATA_ERRORS } from "constants/errors";

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
   * Overwrites the data, only file paths and JSON data are allowed
   * @param data The data to overwrite
   */
  public setData(data: string): void {
    this.data = validateData(data);
  }

  /**
   * Overwrites the data to the data fetched from the url
   * @param url The url to fetch the data from
   */
  public async setDataUrl(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.data = JSON.stringify(data);
    } catch {
      throw new DataError(DATA_ERRORS.INVALID_URL);
    }
  }

  /**
   * Clears the data
   */
  public clearData(): void {
    this.data = {};
  }
}
