/**
 * @fileoverview Declaration for all the AST nodes.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ASTNode } from "./types";
import type {functionCategories, functionNames} from "src/functions/types";

//========================================NODES======================================

export interface RootNode extends ASTNode {
  type: "Root";
}
export interface PropertyNode extends ASTNode {
  type: "Property";
  propertyName: string;
}
export interface ArrayAccessNode extends ASTNode {
  type: "ArrayAccess";
  index: number;
}
export interface FallbackNode extends ASTNode {
  type: "Fallback";
  fallbackValue: string;
}
export interface WildcardNode extends ASTNode {
  type: "Wildcard";
}
export interface ArraySliceNode extends ASTNode {
  sliceRange: {
    start: number;
    end: number;
  };
}
export interface OmitNode extends ASTNode {
  type: "Omit";
}
export interface MultipleSelectNode extends ASTNode {
  type: "MultipleSelect";
  selectedKeys: string[];
}
export interface MultipleOmitNode extends ASTNode {
  type: "MultipleOmit";
  omittedKeys: string[];
}
export interface FunctionNode extends ASTNode {
  type: "Function";
  functionName: functionNames;
  functionCategory: functionCategories;
  functionArgs: string[]
}
export interface ComparisonNode extends ASTNode {
  type: "Comparison";
  comparisonOperator: string;
  comparisonValue: number;
}
export interface ConditionNode extends ASTNode {
  type: "Condition";
}

//===================================================================================
