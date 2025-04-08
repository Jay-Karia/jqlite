/**
 * @fileoverview AST for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ArrayAccessNode, PropertyNode, RootNode } from "./nodes";
import type { ASTNode } from "./types";
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
  public createPropertyNode(
    propertyName: string,
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): PropertyNode {
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
  public createArrayAccessNode(
    index: number,
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): ArrayAccessNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const arrayAccessNode: ArrayAccessNode = {
      type: "ArrayAccess",
      index: index,
      children: child ? [child] : [],
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
   * @param {ASTNode} child - The child node to set.
   * @param {ASTNode} parent - The parent node to set.
   * @returns {FallbackNode} - The created fallback node.
   */
  public createFallbackNode(
    fallbackValue: string,
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const fallbackNode: ASTNode = {
      type: "Fallback",
      fallbackValue,
      children: child ? [child] : [],
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
   * @param {ASTNode} child The child node to set.
   * @param {ASTNode} parent The parent node to set.
   * @returns {ASTNode} The created wildcard node.
   */
  public createWildcardNode(
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const wildcardNode: ASTNode = {
      type: "Wildcard",
      children: child ? [child] : [],
      parent: parent ?? this._root,
    };

    // Update the parent
    updateParent(wildcardNode, this._root, parent);

    // Update the recent node
    this._recentNode = wildcardNode;

    return wildcardNode;
  }

  public createArraySliceNode(
    start?: number,
    end?: number,
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const arraySliceNode: ASTNode = {
      type: "ArraySlice",
      children: child ? [child] : [],
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
   * @param {ASTNode} child The child node to set.
   * @param {ASTNode} parent The parent node to set.
   * @returns {ASTNode} The created omit node.
   */
  public createOmitNode(
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const notNode: ASTNode = {
      type: "Omit",
      children: child ? [child] : [],
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
   * @param {ASTNode | null} child The child node to set.
   * @param {ASTNode | null} parent The parent node to set.
   * @returns {ASTNode} The created multiple select node.
   */
  public createMultipleSelectNode(
    selectedKeys: string[],
    child?: ASTNode | null,
    parent?: ASTNode | null
  ): ASTNode {
    // Check if the root node is empty
    this._root = checkRoot(this._root);

    const multipleSelectNode: ASTNode = {
      type: "MultipleSelect",
      children: child ? [child] : [],
      parent: parent ?? this._root,
      selectedKeys,
    };

    // Update the parent
    updateParent(multipleSelectNode, this._root, parent);

    // Update the recent node
    this._recentNode = multipleSelectNode;

    return multipleSelectNode;
  }

  //====================================DELETION=====================================

  /**
   * Delete the given node along with children.
   * @param {ASTNode} node - The node to be deleted.
   * @return {ASTNode} - The deleted node.
   */
  public deleteNode(node: ASTNode): ASTNode {
    const siblings = node.parent?.children;

    // Get the index of node among it's siblings
    const index = siblings?.indexOf(node);
    if (index === -1 || index === undefined) return node;

    // Remove node from siblings
    siblings?.splice(index, 1);

    // Remove children and parent
    node.children = [];
    node.parent = undefined;

    return node;
  }

  /**
   * Delete the node while preserving the children
   * @param {ASTNode} node - The node to be deleted.
   * @returns {ASTNode} The deleted node.
   */
  public deleteNodeWithPreserve(node: ASTNode): ASTNode {
    const parent = node.parent;
    const children = node.children;

    // Get the index of node among it's siblings
    let index = -1;
    if (parent && parent.children) index = parent.children.indexOf(node);

    // Remove node from siblings
    node.parent?.children?.splice(index, 1);

    // Add the children to siblings
    if (children) {
      children.map(child => {
        node.parent?.children?.push(child);
        child.parent = undefined;
      });
    }

    return this.deleteNode(node);
  }

  //===================================TRAVERSAL=====================================

  /**
   *  Get the nodes in post-order traversal.
   * @returns {ASTNode[]} - The nodes in post-order traversal.
   */
  public postOrder(): ASTNode[] {
    // Check if the root node is empty
    if (!this._root) {
      throw new ParserError(ERROR_MESSAGES.PARSER.ROOT_REQUIRED, {
        root: this._root,
      });
    }

    const result = new Array<ASTNode>();

    // Traverse the AST in post-order
    const traverse = (node: ASTNode): void => {
      if (node.children) {
        node.children.forEach(child => traverse(child));
      }
      result.push(node);
    };
    traverse(this._root);

    return result;
  }

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
   * Add a child node to a parent node.
   * @param {ASTNode} node - The node to which the child will be added.
   * @param {ASTNode} child - The child node to be added.
   * @returns {ASTNode} - The added child node.
   */
  public addChild(node: ASTNode, child: ASTNode): ASTNode {
    const originalParent = child.parent;

    // Add child to the node
    if (node.children) node.children.push(child);
    else node.children = [child];

    // Update the parent of the child
    child.parent = node;

    // Remove child from the original parent
    const index = originalParent?.children?.indexOf(child);
    if (index === -1 || index === undefined) return child;
    originalParent?.children?.splice(index, 1);

    return child;
  }

  /**
   * Add a parent node to a child node.
   * @param {ASTNode} node - The node to which the parent will be added.
   * @param {ASTNode} parent - The parent node to be added.
   * @returns {ASTNode} - The added parent node.
   */
  public addParent(node: ASTNode, parent: ASTNode): ASTNode {
    // Update the siblings
    const index = node.parent?.children?.indexOf(node);
    if (index === -1 || index === undefined) return node;
    node.parent?.children?.splice(index, 1);

    // Add parent to the node
    if (parent.children) parent.children.push(node);
    else parent.children = [node];

    // Update the parent of the node
    node.parent = parent;

    return node;
  }

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

    while (
      current.parent &&
      current.parent.parent &&
      current.parent.type !== "Root"
    ) {
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
