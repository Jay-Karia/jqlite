/**
 * @fileoverview Types for context.
 * @author Jay-Karia
 */

"use strict";

//=======================================TYPES===================================

export interface SliceRange {
  start: number,
  end: number
}
export interface TContext {
  fallback: string | null,
  multipleSelect: boolean,
  selectedKeys: string[]
}
export type Keys = keyof TContext;

//===============================================================================
