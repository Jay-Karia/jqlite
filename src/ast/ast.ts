/**
 * @fileoverview AST for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { RootNode } from "./nodes";

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

  public isEmpty(): void {}
  public createNode(): void {}
  public addChild(): void {}
  public print(): void {}
  public traverse(): void {}
}

export const ast = new AST();
