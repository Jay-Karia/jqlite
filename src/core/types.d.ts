/**
 * @fileoverview Types for context.
 * @author Jay-Karia
 */

"use strict";

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
}
export type Keys = keyof TContext;

//===============================================================================
