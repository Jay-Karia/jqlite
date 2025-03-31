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

//===================================================================================
