import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

configManager.printConfig();

// TODO: Data Streaming
// TODO: Add config validation for new keys
// TODO: fix cannot deep override keys, like data streaming ones

export { queryRunner, dataManager, configManager };
