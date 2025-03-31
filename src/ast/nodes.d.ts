/**
 * @fileoverview Declaration for all the AST nodes.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ASTNode } from "./types";

//========================================NODES======================================

interface RootNode extends ASTNode {
  type: "Root";
}

interface PropertyNode extends ASTNode {
  type: "Property";
}

interface ArrayAccessNode extends ASTNode {
  type: "ArrayAccess";
}

//===================================================================================
