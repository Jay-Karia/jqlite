/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=======================================TYPES=====================================

export type NodeType = "Root" | "Property" | "ArrayAccess" | "Fallback" | "Wildcard" | "ArraySlice";
export interface ASTNode {
  type: NodeType;
  parent?: ASTNode;
  children?: ASTNode[] | null;
  index?: number;
  propertyName?: string;
  fallbackValue?: string;
  sliceRange?: {
    start: number;
    end: number;
  };
}

//=================================================================================
