/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS=====================================

import type { functionCategories } from "src/parser/functions";

//=======================================TYPES=====================================

export type NodeType = "Root" | "Property" | "ArrayAccess" | "Fallback" | "Wildcard" | "ArraySlice" | "Omit" | "MultipleSelect" | "MultipleOmit" | "Function";
export interface ASTNode {
  type: NodeType;
  parent?: ASTNode;
  children?: ASTNode[] | null;
  index?: number;
  propertyName?: string;
  fallbackValue?: string;
  sliceRange?: SliceRange;
  selectedKeys?: string[];
  omittedKeys?: string[];
  functionName?: string;
  functionCategory?: functionCategories;
}

//=================================================================================
