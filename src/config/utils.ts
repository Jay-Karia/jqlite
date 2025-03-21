import {ConfigType} from "./types";

/**
 * Override the given config with the new one
 * @param oldConfig The old config
 * @param newConfig The new config to override
 * @returns The new overridden config
 */
export function overrideConfig(oldConfig: ConfigType, newConfig: ConfigType): ConfigType {
  return {...oldConfig, ...newConfig};
}
