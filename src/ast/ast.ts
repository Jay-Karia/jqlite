/**
 * @fileoverview AST for jqlite.
 * @author Jay-Karia
 */

"use strict";

import { ParserError } from "src/errors/factory";
//======================================IMPORTS====================================

import type { ArrayAccessNode, PropertyNode, RootNode } from "./nodes";
import type { ASTNode } from "./types";
import { ERROR_MESSAGES } from "src/errors/messages";

//=================================================================================

/**
 * AST class
 * @description This class is responsible for creating the AST nodes.
 */
export class AST {
  private _root: RootNode | null;

  /**
   * Creates an instance of the AST class with a root node.
   */
  constructor() {
    this._root = null;
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
      parent: null,
    };
    if (child) rootNode.children?.push(child);

    this._root = rootNode;
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
    if (!this._root) {
      throw new ParserError(ERROR_MESSAGES.AST.EMPTY_AST, {
        root: this._root,
      });
    }

    const propertyNode: PropertyNode = {
      type: "Property",
      parent: parent ?? this._root,
      children: child ? [child] : [],
      propertyName,
    };

    // Update the parent
    if (parent) parent.children?.push(propertyNode);
    else if (this._root.children) this._root.children.push(propertyNode);
    else this._root.children = [propertyNode];

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
    if (!this._root)
      throw new ParserError(ERROR_MESSAGES.AST.EMPTY_AST, {
        rootNode: this._root,
      });

    const arrayAccessNode: ArrayAccessNode = {
      type: "ArrayAccess",
      index: index,
      children: child ? [child] : [],
      parent: parent ?? this._root,
    };

    // Update the parent
    if (parent) parent.children?.push(arrayAccessNode);
    else if (this._root.children) this._root.children.push(arrayAccessNode);
    else this._root.children = [arrayAccessNode];

    return arrayAccessNode;
  }

  //====================================DELETION=====================================

  //=================================================================================

  /**
   * Add a child node to a parent node.
   * @param {ASTNode} node - The node to which the child will be added.
   * @param {ASTNode} child - The child node to be added.
   * @returns {ASTNode} - The added child node.
   */
  public addChild(node: ASTNode, child: ASTNode): ASTNode {
    node.children?.push(child);
    child.parent = node;
    return child;
  }

  /**
   *  Get the root node of the AST.
   * @returns {RootNode} - Returns the root node of the AST.
   */
  public getRootNode(): RootNode | null {
    return this._root;
  }
}

export const ast = new AST();
