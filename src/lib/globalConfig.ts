import { DEFAULT_CONFIG } from "config/index";
import { Config } from "config/config";

const CONFIG = DEFAULT_CONFIG;

export function getConfig() {
  return CONFIG;
}

export function updateConfig(config: Config) {
  Object.assign(CONFIG, config);
}
