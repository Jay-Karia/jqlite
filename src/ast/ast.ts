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
  public root: RootNode | null;

  /**
   * Creates an instance of the AST class with a root node.
   */
  constructor() {
    this.root = null;
  }

  //======================================NODES====================================

  /**
   * Create a root node.
   * @param {ASTNode} child - The child node to be added to the root node.
   * @returns The created root node.
   */
  public createRootNode(child?: ASTNode | null): RootNode {
    const rootNode: RootNode = {
      type: "Root",
      parent: null,
      child: child,
    };

    this.root = rootNode;
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
    if (this.isEmpty())
      throw new ParserError(ERROR_MESSAGES.AST.EMPTY_AST, {
        rootNode: this.root,
      });

    const propertyNode: PropertyNode = {
      type: "Property",
      child: child,
      propertyName: propertyName,
      parent: parent,
    };

    if (parent) parent.child = propertyNode;

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
    if (this.isEmpty())
      throw new ParserError(ERROR_MESSAGES.AST.EMPTY_AST, {
        rootNode: this.root,
      });

    const arrayAccessNode: ArrayAccessNode = {
      type: "ArrayAccess",
      child: child,
      index: index,
      parent: parent,
    };

    if (parent) parent.child = arrayAccessNode;

    return arrayAccessNode;
  }

  //=================================================================================

  /**
   * Checks whether the root node is empty.
   * @returns {boolean} - Returns true if the root node is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return this.root === null;
  }

  /**
   * Add a child node to a parent node.
   * @param {ASTNode} node - The node to which the child will be added.
   * @param {ASTNode} child - The child node to be added.
   * @returns {ASTNode} - The added child node.
   */
  public addChild(node: ASTNode, child: ASTNode): ASTNode {
    node.child = child;
    child.parent = node;
    return child;
  }

  /**
   * Print the full AST.
   */
  public print(): void {
    console.log("AST: ", JSON.stringify(this.root, null, 2));
  }
}

export const ast = new AST();
