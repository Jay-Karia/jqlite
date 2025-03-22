import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

// TODO: add timeStamp in all errors
// TODO: fix fileData, or urlData in metadata of errors
// TODO: add verbose stack trace

export { queryRunner, dataManager, configManager };
