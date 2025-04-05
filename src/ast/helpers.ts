/**
 * @fileoverview Helper functions for AST.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ASTNode } from "./types";
import type { RootNode } from "./nodes";

//=================================================================================

/**
 * Update the parent node by adding a new child node.
 * @param {ASTNode} newNode - The new child node to be added.
 * @param {RootNode} root - The root node of the AST.
 * @param {ASTNode} parent - The parent node to which the new child node will be added.
 */
export function updateParent(
  newNode: ASTNode,
  root: RootNode,
  parent?: ASTNode | null
): void {
  if (parent) parent.children?.push(newNode);
  else if (root.children) root.children.push(newNode);
  else root.children = [newNode];
}
