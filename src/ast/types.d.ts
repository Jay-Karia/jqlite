/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS=====================================

import type { functionCategories, functionNames } from "src/functions/types";

//=======================================TYPES=====================================

export type NodeType = "Root" | "Property" | "ArrayAccess" | "Fallback" | "Wildcard" | "ArraySlice" | "Omit" | "MultipleSelect" | "MultipleOmit" | "Function" | "Comparison" | "Condition";
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
  functionName?: functionNames;
  functionCategory?: functionCategories;
  functionArgs?: string[];
  comparisonOperator?: string;
  comparisonValue?: number;
}

//=================================================================================
