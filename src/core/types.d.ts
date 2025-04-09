/**
 * @fileoverview Types for context.
 * @author Jay-Karia
 */

"use strict";

//=======================================IMPORTS=================================

import type { FunctionCategory } from "src/ast/types";

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
  functionCategory: FunctionCategory | null;
}
export type Keys = keyof TContext;

//===============================================================================
