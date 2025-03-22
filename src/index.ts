import { queryRunner } from "./core/runner";
import { dataManager } from "./data/manager";
import { configManager } from "./config/manager";

configManager.use("./testConfig.json");
console.log(configManager.get());
dataManager.set({
  name: "Jay"
});
dataManager.save();

export { queryRunner, dataManager, configManager };
