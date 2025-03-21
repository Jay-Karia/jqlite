import { queryRunner, QueryRunner } from "./core/runner";
import { dataManager, DataManager } from "./data/manager";
import { configManager, ConfigManager } from "./config/manager";
import { JQLiteInstances } from "types/index";

export class JQLite {
  public queryRunner = queryRunner;
  public dataManager = dataManager;
  public configManager = configManager;

  constructor(options?: JQLiteInstances) {
    if (options?.queryRunner) this.queryRunner = queryRunner;
    if (options?.dataManager) this.dataManager = dataManager;
    if (options?.configManager) this.configManager = configManager;
  }
}

export { queryRunner, dataManager, configManager, QueryRunner, DataManager, ConfigManager };
