/**
 * @fileoverview Configuration types for jqlite.
 * @author Jay-Karia
 */

"use strict";

//==================================TYPES=========================================

export type ConfigType = {
  loadFile: string | null;
  fetchUrl: string | null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
};
export type OverrideConfigType = Partial<ConfigType>;

//=================================================================================
