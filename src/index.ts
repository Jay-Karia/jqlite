import { configManager } from "./config/manager";
import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";

dataManager.load("./data/2mb.json");
// TODO: add option to manually stream data

export { queryRunner, dataManager, configManager };
