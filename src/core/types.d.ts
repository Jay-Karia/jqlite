/**
 * @fileoverview Types for context.
 * @author Jay-Karia
 */

"use strict";

//=======================================IMPORTS=================================

import type { functionCategories, functionNames } from "src/functions/types";

//=======================================TYPES===================================

export interface SliceRange {
  start: number;
  end: number;
}
export type SliceType = "left" | "right" | null;
export type ComparisonOperator = "<" | "<=" | ">" | ">=" | "==" | "!=";

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
  functionName: functionNames | null;
  isComparison: boolean;
  comparisonOperator: ComparisonOperator | null;
  isCondition: boolean;
  isArrayAccess: boolean;
  openParen: number;
  openBracket: number;
}

export type Keys = keyof TContext;

//===============================================================================
