import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

dataManager.set({
  name: "John Doe",
  age: 30,
});

dataManager.save();

export { queryRunner, dataManager, configManager };
