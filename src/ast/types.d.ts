/**
 * @fileoverview Type definitions for parser.
 * @author Jay-Karia
 */

"use strict";

//=======================================TYPES=====================================

export type NodeType = "Root" | "Property" | "ArrayAccess";

export interface ASTNode {
  type: NodeType;
  children: ASTNode[];
  parent?: ASTNode;
  value?: string | number;
}

//=================================================================================
