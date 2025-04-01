/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=======================================TYPES=====================================

export type NodeType = "Root" | "Property" | "ArrayAccess";

export interface ASTNode {
  type: NodeType;
  parent?: ASTNode | null;
  left?: ASTNode | null;
  right?: ASTNode | null;
  child?: ASTNode | null;
}

//=================================================================================
