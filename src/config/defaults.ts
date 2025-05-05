/**
 * @fileoverview Default configuration for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ConfigType } from "./types";

//=====================================DEFAULTS====================================

export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";
export const DEFAULT_CONFIG: ConfigType = {
  loadFile: null,
  fetchUrl: null,
  fallback: null,
  quotedArguments: true,
  arrayConditionFormat: "array"
};

//=================================================================================
