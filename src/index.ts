import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

dataManager.set({ hello: "world" });

// await dataManager.loadFromUrl("https://github.com/Jay-Karia/jqlite/raw/refs/heads/main/.prettierrc.json");


export { queryRunner, dataManager, configManager };
