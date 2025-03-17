import { DEFAULT_CONFIG } from "config/index";
import { Config } from "config/config";

let CONFIG: Config | undefined;

export function getConfig() {
  if (!CONFIG) return DEFAULT_CONFIG;
  return CONFIG;
}

export function updateConfig(config: Config) {
  CONFIG = config;
}

export function getDefaultConfig() {
  return DEFAULT_CONFIG;
}
