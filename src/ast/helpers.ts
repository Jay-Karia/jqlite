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
export function updateParent(newNode: ASTNode, root: RootNode, parent?: ASTNode | null): void {
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
  if (node.type === "ArrayAccess") obj["index"] = node.index;
  else if (node.type === "Property") obj["propertyName"] = node.propertyName;
  else if (node.type === "Fallback") obj["fallbackValue"] = node.fallbackValue;
  else if (node.type === "ArraySlice") obj["sliceRange"] = node.sliceRange;
  else if (node.type === "MultipleSelect") obj["selectedKeys"] = node.selectedKeys;
  else if (node.type === "MultipleOmit") obj["omittedKeys"] = node.omittedKeys;
  else if (node.type === "Function") {
    obj["functionName"] = node.functionName;
    obj["functionCategory"] = node.functionCategory;
    obj["functionArgs"] = node.functionArgs;
  }
  else if (node.type === "Comparison") {
    obj["comparisonOperator"] = node.comparisonOperator;
    obj["comparisonValue"] = node.comparisonValue;
  } else if (node.type === "Logical") obj["logicalOperator"] = node.logicalOperator;
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
