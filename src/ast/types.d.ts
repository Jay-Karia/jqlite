/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS=====================================

import type { SliceRange } from "src/core/types";

//=======================================TYPES=====================================

export type NodeType =
  | "Root"
  | "Property"
  | "ArrayAccess"
  | "Fallback"
  | "Wildcard"
  | "ArraySlice"
  | "Omit"
  | "MultipleSelect";
export interface ASTNode {
  type: NodeType;
  parent?: ASTNode;
  children?: ASTNode[] | null;
  index?: number;
  propertyName?: string;
  fallbackValue?: string;
  sliceRange?: SliceRange;
  selectedKeys?: string[];
}

//=================================================================================
