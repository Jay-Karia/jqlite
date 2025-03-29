/**
 * @fileoverview Default configuration for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ConfigType } from "./types";

//=================================================================================

/* The default config file name */
export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";

/* The default config values */
export const DEFAULT_CONFIG: ConfigType = {
  loadFile: null,
  fetchUrl: null,
  allowOverwrite: false,
  createIfMissing: true,
};
