import { CONFIG_ERRORS, ConfigError } from "errors";
import { Config } from "types/config";

/**
 * Validate the config object
 * @param config The config object to validate
 */
function validateConfig(config: Config) {
  if (config.fuzzyLimit && config.fuzzyLimit < 0)
    throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_LIMIT);
  if (config.fuzzyDistance && config.fuzzyDistance < 0)
    throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_DISTANCE);
  if (config.aliases) {
    if (config.aliases.some(a => a.alias.length == 0))
      throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY);
    if (config.aliases.some(a => a.path.length == 0))
      throw new ConfigError(CONFIG_ERRORS.PATH.EMPTY);
  }

  // check for duplicate aliases and paths
  if (config.aliases) {
    const aliases = config.aliases.map(a => a.alias);
    const paths = config.aliases.map(a => a.path);

    if (new Set(aliases).size !== aliases.length)
      throw new ConfigError(CONFIG_ERRORS.ALIAS.DUPLICATE);
    if (new Set(paths).size !== paths.length)
      throw new ConfigError(CONFIG_ERRORS.PATH.DUPLICATE);
  }
}

export { validateConfig };
