import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

// TODO: fix config store get function to return the guaranteed config object
// TODO: fix: add type validation in json configs (later)

export { queryRunner, dataManager, configManager };
