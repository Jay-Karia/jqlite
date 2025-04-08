/**
 * @fileoverview Declaration for all the AST nodes.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ASTNode } from "./types";

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
  }
}
export interface NotNode extends ASTNode {
  type: "Not";
}
//===================================================================================
