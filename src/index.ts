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

const jqlite = new JQLite();
// jqlite.configManager.addAlias("foo", "bar")

console.log(jqlite.configManager.config);
