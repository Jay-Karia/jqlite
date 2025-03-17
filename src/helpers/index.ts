import { DEFAULT_CONFIG } from "config/index";
import { Config } from "config/config";
import { validateConfig } from "validators/validate-config";
import { getConfig } from "lib/globalConfig";

/**
 * Override the default config object with the given config object
 * @param config The config object to override
 * @returns The new config object
 */
function overrideDefaultConfig(config: Config): Config {
  validateConfig(config);
  return { ...DEFAULT_CONFIG, ...config };
}

/**
 * Check if the verbose event is enabled
 * @returns Whether the verbose event is enabled
 */
function isVerboseEvent(): boolean {
  const verbose = getConfig().events?.verbose;
  return verbose || false;
}

export { overrideDefaultConfig, isVerboseEvent };
