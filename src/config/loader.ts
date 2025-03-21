import {DEFAULT_CONFIG} from "./defaults";
import {DefaultConfigType} from "./types";

/**
 * Load the default config
 * @returns The default config
 */
export function loadDefaultConfig(): DefaultConfigType {
  return DEFAULT_CONFIG;
}
