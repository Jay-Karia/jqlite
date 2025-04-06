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

/**
 * Add specific node keys to JSON object like index, propertyName, ...
 * @param {ASTNode} node - The node which will be added to JSON
 * @param {any} obj - The JSON object of the node
 */
export function addSpecificKeys(node: ASTNode, obj: any): void {
  // Array access
  if (node.type === "ArrayAccess" && node.index !== undefined)
    obj["index"] = node.index;
  // Property
  else if (node.type === "Property" && node.propertyName)
    obj["propertyName"] = node.propertyName;
}
