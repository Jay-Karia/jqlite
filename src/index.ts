import { Config } from "./types/config";
import { ConfigManager } from "./config";
import { validateData } from "lib/validate-data";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;
  public data: string | object;

  constructor(config?: Config, data?: string) {
    this.configManager = new ConfigManager(config);
    this.data = data ? validateData(data as string) : {};
  }
}
