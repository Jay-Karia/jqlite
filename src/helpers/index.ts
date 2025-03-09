import { DEFAULT_CONFIG } from "config";
import { Config } from "types/config";
import { validateConfig } from "validators/validate-config";

/**
 * Override the default config object with the given config object
 * @param config The config object to override
 * @returns The new config object
 */
function overrideDefaultConfig(config: Config): Config {
  validateConfig(config);
  return { ...DEFAULT_CONFIG, ...config };
}

export { overrideDefaultConfig };
