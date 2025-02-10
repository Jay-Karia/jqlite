import { Config } from "./types/config";
import { ConfigManager } from "config";

/**
 * JQLite
 */
export class JQLite {
  public configManager: ConfigManager;

  constructor(config?: Config) {
    this.configManager = new ConfigManager(config);
  }
}
