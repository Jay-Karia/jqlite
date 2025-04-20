/**
 * @fileoverview Configuration types for jqlite.
 * @author Jay-Karia
 */

"use strict";

//==================================TYPES=========================================

export type ConfigType = {
  loadFile: string | null;
  fetchUrl: string | null;
  fallback: string | null;
  quotedArguments: boolean;
};
export type OverrideConfigType = Partial<ConfigType>;

//=================================================================================
