import { DEFAULT_CONFIG } from "config";
import { Config } from "types/config";

const CONFIG = DEFAULT_CONFIG;

export function getConfig() {
  return CONFIG;
}

export function updateConfig(config: Config) {
  Object.assign(CONFIG, config);
}
