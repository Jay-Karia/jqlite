/**
 * @fileoverview Types for context.
 * @author Jay-Karia
 */

"use strict";

//=======================================IMPORTS=================================

import type {functionCategories} from "src/functions/types";

//=======================================TYPES===================================

export interface SliceRange {
  start: number;
  end: number;
}
export type SliceType = "left" | "right" | null;
export interface TContext {
  fallback: string | null;
  multipleSelect: boolean;
  selectedKeys: string[];
  multipleOmit: boolean;
  omittedKeys: string[];
  sliceType: SliceType;
  isFunction: boolean;
  functionCategory: functionCategories | null;
  functionArgs: string[];
}
export type Keys = keyof TContext;

//===============================================================================
