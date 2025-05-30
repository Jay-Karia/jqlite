/**
 * @fileoverview AST for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ArrayAccessNode, PropertyNode, RootNode } from "./nodes";
import type { ASTNode } from "./types";
import type { functionCategories, functionNames } from "src/functions/types";
import { ERROR_MESSAGES } from "src/errors/messages";
import { ParserError } from "src/errors/factory";
import { addSpecificKeys, checkRoot, updateParent } from "./helpers";

//=================================================================================

/**
 * AST class
 * @description This class is responsible for creating the AST nodes.
 */
export class AST {
  private _root: RootNode | null;
  private _recentNode: ASTNode | null;
  private _conditionNode: ASTNode | null;

  /**
   * Creates an instance of the AST class with a root node.
   */
  constructor() {
    this._root = null;
    this._recentNode = null;
    this._conditionNode = null;
  }

  //====================================INSERTION==================================

  /**
   * Create a root node.
   * @param {ASTNode} child - The child node to be added to the root node.
   * @returns The created root node.
   */
  public createRootNode(child?: ASTNode | null): RootNode {
    const rootNode: RootNode = {
      type: "Root",
      parent: undefined,
    };
    if (child) rootNode.children?.push(child);

    this._root = rootNode;
    this._recentNode = rootNode;

    return rootNode;
  }

  /**
   * Create a property node.
   * @param {string} propertyName - The name of the property.
   * @param {ASTNode} child - The child node to set.
   * @param {ASTNode} parent - The parent node to set.
   * @returns {PropertyNode} - The created property node.
   */
  public createPropertyNode(propertyName: string, child?: ASTNode | null, parent?: ASTNode | null): PropertyNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const propertyNode: PropertyNode = {
      type: "Property",
      parent: parent ?? this._root,
      children: child ? [child] : [],
      propertyName,
    };

    // Update the parent
    updateParent(propertyNode, this._root, parent);

    // Update the recent node
    this._recentNode = propertyNode;

    return propertyNode;
  }

  /**
   *
   * @param {number} index - The index of the array access node.
   * @param {ASTNode} child - The child node to set.
   * @param {ASTNode} parent - The parent node to set.
   * @returns {ArrayAccessNode} - The created array access node.
   */
  public createArrayAccessNode(index: number, parent?: ASTNode | null): ArrayAccessNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const arrayAccessNode: ArrayAccessNode = {
      type: "ArrayAccess",
      index: index,
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(arrayAccessNode, this._root, parent);

    // Update the recent node
    this._recentNode = arrayAccessNode;

    return arrayAccessNode;
  }

  /**
   * Create a fallback node.
   * @param {string} fallbackValue - The fallback value.
   * @param {ASTNode} parent - The parent node to set.
   * @returns {FallbackNode} - The created fallback node.
   */
  public createFallbackNode(fallbackValue: string, parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const fallbackNode: ASTNode = {
      type: "Fallback",
      fallbackValue,
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(fallbackNode, this._root, parent);

    // Update the recent node
    this._recentNode = fallbackNode;

    return fallbackNode;
  }

  /**
   * Create a wildcard node.
   * @param {ASTNode} parent The parent node to set.
   * @returns {ASTNode} The created wildcard node.
   */
  public createWildcardNode(parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const wildcardNode: ASTNode = {
      type: "Wildcard",
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(wildcardNode, this._root, parent);

    // Update the recent node
    this._recentNode = wildcardNode;

    return wildcardNode;
  }

  /**
   * Create a array slice node.
   * @param {number} start The start index of the array slice node.
   * @param {number} end The end index of the array slice node.
   * @param {ASTNode} parent The parent node to set.
   * @returns {ASTNode} The created array slice node.
   */
  public createArraySliceNode(start?: number, end?: number, parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const arraySliceNode: ASTNode = {
      type: "ArraySlice",
      parent: parent ?? this._root,
      sliceRange: {
        start: start ?? 0,
        end: end ?? 0,
      },
    };

    // Update the parent
    updateParent(arraySliceNode, this._root, parent);

    // Update the recent node
    this._recentNode = arraySliceNode;

    return arraySliceNode;
  }

  /**
   * Create a omit node.
   * @param {ASTNode} parent The parent node to set.
   * @returns {ASTNode} The created omit node.
   */
  public createOmitNode(parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const notNode: ASTNode = {
      type: "Omit",
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(notNode, this._root, parent);

    // Update the recent node
    this._recentNode = notNode;

    return notNode;
  }

  /**
   * Create a multiple select node.
   * @param {string[]} selectedKeys The selected keys of the multiple select node.
   * @param {ASTNode | null} parent The parent node to set.
   * @returns {ASTNode} The created multiple select node.
   */
  public createMultipleSelectNode(selectedKeys: string[], parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const multipleSelectNode: ASTNode = {
      type: "MultipleSelect",
      parent: parent ?? this._root,
      selectedKeys,
    };

    // Update the parent
    updateParent(multipleSelectNode, this._root, parent);

    // Update the recent node
    this._recentNode = multipleSelectNode;

    return multipleSelectNode;
  }

  /**
   * Create a multiple omit node.
   * @param {string[]} omittedKeys The omitted keys of the multiple omit node.
   * @param {ASTNode | null} parent The parent node to set.
   * @returns {ASTNode} The created multiple omit node.
   */
  public createMultipleOmitNode(omittedKeys: string[], parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const multipleOmitNode: ASTNode = {
      type: "MultipleOmit",
      parent: parent ?? this._root,
      omittedKeys,
    };

    // Update the parent
    updateParent(multipleOmitNode, this._root, parent);

    // Update the recent node
    this._recentNode = multipleOmitNode;

    return multipleOmitNode;
  }

  /**
   * Create a function node.
   * @param {functionNames} functionName - The name of the function.
   * @param {string[]} functionArgs - The arguments of the function.
   * @param {FunctionCategory} functionCategory - The category of the function.
   * @param {ASTNode | null} parent - The parent node to set.
   * @returns {ASTNode} The created function node.
   */
  public createFunctionNode(functionName: functionNames, functionArgs: string[], functionCategory: functionCategories, parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const functionNode: ASTNode = {
      type: "Function",
      parent: parent ?? this._root,
      functionName,
      functionCategory,
      functionArgs,
    };

    // Update the parent
    updateParent(functionNode, this._root, parent);

    // Update the recent node
    this._recentNode = functionNode;

    return functionNode;
  }

  /**
   * Create a comparison node.
   * @param {string} comparisonOperator - The comparison operator.
   * @param {number} number - The number to compare.
   * @param {ASTNode | null} parent - The parent node to set.
   * @returns {ASTNode} The created comparison node.
   */
  public createComparisonNode(comparisonOperator: string, number: number, parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const comparisonNode: ASTNode = {
      type: "Comparison",
      parent: parent ?? this._root,
      comparisonOperator,
      comparisonValue: number,
    };

    // Update the parent
    updateParent(comparisonNode, this._root, parent);

    // Update the recent node
    this._recentNode = comparisonNode;

    return comparisonNode;
  }

  /**
   * Create a condition node.
   * @param {ASTNode | null} parent - The parent node to set.
   * @returns {ASTNode} The created condition node.
   */
  public createConditionNode(parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const conditionNode: ASTNode = {
      type: "Condition",
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(conditionNode, this._root, parent);

    // Update the recent and condition node
    this._recentNode = conditionNode;
    this._conditionNode = conditionNode;

    return conditionNode;
  }

  /**
   * Create a context node.
   * @param {ASTNode | null} parent - The parent node to set.
   * @returns {ASTNode} The created context node.
   */
  public createContextNode(parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const contextNode: ASTNode = {
      type: "Context",
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(contextNode, this._root, parent);

    // Update the recent node
    this._recentNode = contextNode;

    return contextNode;
  }

  /**
   * Create a logical node.
   * @param {string} logicalOperator - The logical operator.
   * @param {ASTNode | null} parent - The parent node to set.
   * @returns {ASTNode} The created logical node.
   */
  public createLogicalNode(logicalOperator: string, parent?: ASTNode | null): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const logicalNode: ASTNode = {
      type: "Logical",
      parent: parent ?? this._root,
      logicalOperator,
    };

    // Update the parent
    updateParent(logicalNode, this._root, parent);

    // Update the recent node
    this._recentNode = logicalNode;

    return logicalNode;
  }

  //===================================TRAVERSAL=====================================

  /**
   * Get the nodes in pre-order traversal with circular references removed.
   * @returns {ASTNode[]} - The nodes in pre-order traversal.
   */
  public preOrder(): ASTNode[] {
    const result = new Array<ASTNode>();

    // Traverse the AST in pre-order
    const traverse = (node: ASTNode): void => {
      // Create a copy of the node without circular references
      const sanitizedNode = { ...node };

      // Remove the parent property to break circular reference
      delete sanitizedNode.parent;

      // Also remove the children property initially
      delete sanitizedNode.children;

      // Add the sanitized node to results
      result.push(sanitizedNode);

      // Traverse children if they exist and recreate the children array
      // without circular references
      if (node.children && node.children.length > 0) {
        sanitizedNode.children = [];
        node.children.forEach(child => {
          traverse(child);
        });
      }
    };

    traverse(this._root as ASTNode);

    return result;
  }

  /**
   * Convert the AST to JSON format.
   * @returns {string} - The AST in JSON format.
   */
  public toJSON(): string {
    // Check if the root node is empty
    if (!this._root) {
      throw new ParserError(ERROR_MESSAGES.PARSER.ROOT_REQUIRED, {
        root: this._root,
      });
    }

    // Create a deep copy of the AST without circular references
    const sanitizeNode = (node: ASTNode): any => {
      const copy: any = { ...node };

      // Remove parent reference to break circularity
      delete copy.parent;

      // Process children recursively
      if (node.children && node.children.length > 0) {
        copy.children = node.children.map(child => sanitizeNode(child));
      } else {
        delete copy.children;
      }

      // Add type-specific keys
      addSpecificKeys(node, copy);

      return copy;
    };

    const sanitized = sanitizeNode(this._root);
    return JSON.stringify(sanitized);
  }

  //=================================================================================

  /**
   * Get the highest-level parent node after root
   * @param {ASTNode} node - The node to find the highest parent for
   * @returns {ASTNode | null} - The highest parent after root, or null if not found
   */
  public getHighestParent(node: ASTNode | null): ASTNode | null {
    // If node is null or undefined, return null
    if (!node) return null;

    // If node is the root or has no parent, return null
    if (!node.parent || node.parent.type === "Root") return node;

    // Traverse up the tree until we find a node whose parent is the root
    let current = node;

    while (current.parent && current.parent.parent && current.parent.type !== "Root") {
      current = current.parent;
    }

    // Return the highest parent after root
    return current;
  }

  /**
   *  Get the root node of the AST.
   * @returns {RootNode} - Returns the root node of the AST.
   */
  public getRootNode(): RootNode {
    return this._root as RootNode;
  }

  /**
   * Get the most recent node created.
   * @returns {ASTNode | null} - Returns the most recent node created.
   */
  public getRecentNode(): ASTNode | null {
    return this._recentNode;
  }

  /**
   * Get the condition node of the AST.
   * @returns {ASTNode | null} - Returns the condition node of the AST.
   */
  public getConditionNode(): ASTNode | null {
    return this._conditionNode;
  }

  /**
   * Reset the AST.
   */
  public reset(): void {
    this._root = null;
    this._recentNode = null;
    this._conditionNode = null;
  }
}

export const ast = new AST();
