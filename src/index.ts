import { Config } from "./types/config";
import { ConfigManager } from "config";

/**
 * JQLite
 */
export class JQLite {
  public config: ConfigManager;

  constructor(config?: Config) {
    this.config = new ConfigManager(config);
  }
}
