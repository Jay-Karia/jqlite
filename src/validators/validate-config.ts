import { CONFIG_ERRORS } from "../constants/errors";
import { Config, DataCache, Fallback, Fuzzy } from "../config/config";
import { ConfigError } from "../errors";

/**
 * Validate the config object
 * @param config The config object to validate
 */
function validateConfig(config: Config) {
  validateFuzzyOptions(config.fuzzy);
  validateFallback(config.fallback);
  validateDataCache(config.dataCache);

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
function validateFuzzyOptions(fuzzy?: Fuzzy) {
  if (fuzzy) {
    if (fuzzy.distance && fuzzy.distance < 0)
      throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_DISTANCE);
    if (fuzzy.limit && fuzzy.limit < 0)
      throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_LIMIT);
  }
}

/**
 * Check for duplicate aliases and paths
 * @param config The config object to check
 * @param param1 The alias and path to check
 */
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

/**
 * Validate an alias
 * @param config The config object to check
 * @param alias Teh alias to validate
 */
function validateAlias(config: Config, alias: string) {
  if (!config.aliases || config.aliases.length === 0)
    throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY_ARRAY);

  const aliasExists = config.aliases.some(a => a.alias === alias);
  if (!aliasExists) throw new ConfigError(CONFIG_ERRORS.ALIAS.NOT_FOUND);
}

/**
 * Validate a fallback object
 * @param fallback Teh fallback object to validate
 */
function validateFallback(fallback?: Fallback) {
  if (fallback) {
    if (fallback.strategy !== "default" && fallback.value)
      throw new ConfigError(CONFIG_ERRORS.FALLBACK.VALUE_NOT_REQUIRED);
    if (fallback.strategy === "default" && !fallback.value)
      throw new ConfigError(CONFIG_ERRORS.FALLBACK.VALUE_REQUIRED);

    if (fallback.strategy === "infer")
      if (
        !fallback.inferRules ||
        (fallback.inferRules &&
          !fallback.inferRules.alternateKeys &&
          !fallback.inferRules.alternateQueries) ||
        (fallback.inferRules &&
          (fallback.inferRules.alternateKeys?.length === 0 ||
            fallback.inferRules.alternateQueries?.length === 0))
      )
        throw new ConfigError(CONFIG_ERRORS.FALLBACK.INFER_RULES_REQUIRED);

    if (fallback.strategy !== "infer" && fallback.inferRules)
      throw new ConfigError(CONFIG_ERRORS.FALLBACK.INFER_RULES_NOT_REQUIRED);
  }
}

function validateDataCache(dataCache?: DataCache) {
  if (dataCache) {
    if (dataCache.type === "none" && dataCache.limit)
      throw new ConfigError(CONFIG_ERRORS.DATA_CACHE.LIMIT_NOT_REQUIRED);
    if (dataCache.expiration && dataCache.expiration <= new Date())
      throw new ConfigError(CONFIG_ERRORS.DATA_CACHE.INVALID_EXPIRATION);
  }
}

export {
  validateConfig,
  validateFuzzyOptions,
  checkDuplicateAliases,
  validateAlias,
  validateFallback,
  validateDataCache,
};
