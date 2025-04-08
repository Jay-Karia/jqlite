/**
 * @fileoverview Helper functions for AST.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ASTNode } from "./types";
import type { RootNode } from "./nodes";
import { ParserError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

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
  if (parent && parent.children) parent.children.push(newNode);
  else if (parent && !parent.children) parent.children = [newNode];
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
  // Fallback
  else if (node.type === "Fallback" && node.fallbackValue)
    obj["fallbackValue"] = node.fallbackValue;
  else if (node.type === "ArraySlice" && node.sliceRange)
    obj["sliceRange"] = node.sliceRange;
  else if (node.type === "MultipleSelect" && node.selectedKeys)
    obj["selectedKeys"] = node.selectedKeys;
  else if (node.type === "MultipleOmit" && node.omittedKeys)
    obj["omittedKeys"] = node.omittedKeys;
}

/**
 * Checks whether the root node is not null
 * @param {RootNode | null} root - The root node of the AST.
 * @returns {RootNode} The root node if it is not null.
 */
export function checkRoot(root: RootNode | null): RootNode {
  // Check if the root node is null
  if (!root) {
    throw new ParserError(ERROR_MESSAGES.PARSER.ROOT_REQUIRED, {
      rootNode: root,
    });
  }

  return root;
}
