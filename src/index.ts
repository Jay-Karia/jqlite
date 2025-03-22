import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

await dataManager.loadFromUrl();
console.log(dataManager.get());

export { queryRunner, dataManager, configManager };
