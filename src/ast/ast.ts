/**
 * @fileoverview AST for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ArrayAccessNode, PropertyNode, RootNode } from "./nodes";
import type { ASTNode } from "./types";
import type {functionCategories, functionNames} from "src/functions/types";
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

  /**
   * Creates an instance of the AST class with a root node.
   */
  constructor() {
    this._root = null;
    this._recentNode = null;
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
      functionArgs
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

    // Update the recent node
    this._recentNode = conditionNode;

    return conditionNode;
  }

  //===================================TRAVERSAL=====================================

  /**
   * Get the nodes in pre-order traversal.
   * @returns {ASTNode[]} - The nodes in pre-order traversal.
   */
  public preOrder(): ASTNode[] {
    // Check if the root node is empty
    if (!this._root) {
      throw new ParserError(ERROR_MESSAGES.PARSER.ROOT_REQUIRED, {
        root: this._root,
      });
    }

    const result = new Array<ASTNode>();

    // Traverse the AST in pre-order
    const traverse = (node: ASTNode): void => {
      result.push(node);
      if (node.children) {
        node.children.forEach(child => traverse(child));
      }
    };
    traverse(this._root);

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

    // Convert the AST to JSON
    const traverse = (node: ASTNode): any => {
      const obj: any = {
        type: node.type,
      };

      // Add specific node properties to the object
      addSpecificKeys(node, obj);

      if (node.children && node.children.length > 0) {
        obj.children = node.children.map(child => traverse(child));
      }

      return obj;
    };
    return JSON.stringify(traverse(this._root), null, 2);
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
  public getRootNode(): RootNode | null {
    return this._root;
  }

  /**
   * Get the most recent node created.
   * @returns {ASTNode | null} - Returns the most recent node created.
   */
  public getRecentNode(): ASTNode | null {
    return this._recentNode;
  }
}

export const ast = new AST();
