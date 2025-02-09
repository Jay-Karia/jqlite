import { Config } from "types/config";
import { DEFAULT_CONFIG, overrideConfig, ConfigManager } from "config";

export class JQLite {
  private config: Config;
  private configManager: ConfigManager;

  constructor(config?: Config) {
    this.config = config ? overrideConfig(config) : DEFAULT_CONFIG;
    this.configManager = new ConfigManager(this.config);
  }

  public getConfig(): Config {
    return this.configManager.get();
  }

  public resetConfig(): void {
    this.configManager.reset();
  }

  public addAlias(alias: string, path: string): void {
    this.configManager.addAlias(alias, path);
  }

  public removeAlias(alias: string): void {
    this.configManager.removeAlias(alias);
  }

  public clearAliases(): void {
    this.configManager.clearAliases();
  }

  public setFallback(fallback: string): void {
    this.configManager.setFallback(fallback);
  }

  public overrideFuzzyConfig(options: { [key: string]: any }): void {
    this.configManager.overrideFuzzyConfig(options);
  }

  public overrideConfig(config: Config): void {
    this.configManager.overrideConfig(config);
  }
}

const jqlite = new JQLite({
  aliases: [
    {
      alias: "foo",
      path: "bar",
    },
  ],
});

console.log(jqlite.getConfig());
