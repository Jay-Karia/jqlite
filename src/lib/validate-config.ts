import { CONFIG_ERRORS, ConfigError } from "../errors";
import { Config } from "../types/config";

/**
 * Validate the config object
 * @param config The config object to validate
 */
function validateConfig(config: Config) {
  validateFuzzyOptions(config.fuzzyDistance, config.fuzzyLimit);

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
      throw new ConfigError(CONFIG_ERRORS.ALIAS.EXISTS);
    if (new Set(paths).size !== paths.length)
      throw new ConfigError(CONFIG_ERRORS.PATH.EXISTS);
  }
}

/**
 * Validate fuzzy distance and fuzzy limit
 * @param fuzzyDistance The fuzzy distance to validate
 * @param fuzzyLimit The fuzzy limit to validate
 */
function validateFuzzyOptions(
  fuzzyDistance?: number,
  fuzzyLimit?: number
): void {
  if (fuzzyDistance && fuzzyDistance < 0)
    throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_DISTANCE);
  if (fuzzyLimit && fuzzyLimit < 0)
    throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_LIMIT);
}

function checkDuplicateAliases(
  config: Config,
  { alias, path }: { alias: string; path: string }
) {
  if (config.aliases) {
    const aliasExists = config.aliases.some(a => a.alias === alias);
    if (aliasExists) throw new ConfigError(CONFIG_ERRORS.ALIAS.EXISTS);

    const pathExists = config.aliases.some(a => a.path === path);
    if (pathExists) throw new ConfigError(CONFIG_ERRORS.PATH.EXISTS);
  }
}

function validateAlias(config: Config, alias: string) {
  if (!config.aliases || config.aliases.length === 0)
    throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY_ARRAY);

  const aliasExists = config.aliases.some(a => a.alias === alias);
  if (!aliasExists) throw new ConfigError(CONFIG_ERRORS.ALIAS.NOT_FOUND);
}

export {
  validateConfig,
  validateFuzzyOptions,
  checkDuplicateAliases,
  validateAlias,
};
