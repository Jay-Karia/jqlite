import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "lib/validate-data";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public data: string | Promise<string>;

  /**
   * The constructor for JQLite
   * @param config The config object to override
   * @param data The JSON data or path to a JSON file
   */
  constructor(config?: Config, data?: string) {
    this.configManager = new ConfigManager(config);
    this.data = data ? validateData(data as string) : "{}";
  }

  /**
   * Overwrites the data
   * @param data The data to overwrite
   */
  public setData(data: string): { resolve: () => Promise<void> } {
    this.data = validateData(data);
    return {
      resolve: async () => {
        this.data = await this.data;
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
  public async resolve() {
    this.data = await this.data;
  }
}
