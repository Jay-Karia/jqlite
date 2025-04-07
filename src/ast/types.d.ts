/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=======================================TYPES=====================================

export type NodeType = "Root" | "Property" | "ArrayAccess" | "Fallback";
export interface ASTNode {
  type: NodeType;
  parent?: ASTNode;
  children?: ASTNode[] | null;
  index?: number;
  propertyName?: string;
  fallbackValue?: string;
}

//=================================================================================
