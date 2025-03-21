import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

// configManager.set({ defaultPath: "../test.json" });
dataManager.set({hello: "world1"});

dataManager.save();

export { queryRunner, dataManager, configManager };
