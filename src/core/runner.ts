/**
 * @fileoverview The query runner for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { Token } from "../lexer/tokens";
import { lexer } from "../lexer/lexer";
import { ast } from "../ast/ast";

//=================================================================================

/**
 * Query runner class
 * @description This class is responsible for running the query.
 */
export class QueryRunner {
  /**
   * Runs the query
   * @description Runs the query and returns the result
   * @param {string} query The query to run
   * @return {void}
   * @example
   * ```ts
   * query.run("$.friends[0].name");
   * ```
   */
  public run(query: string): void {
    const tokens: Token[] = lexer.tokenize(query);

    const root = ast.createRootNode();

    const access = ast.createArrayAccessNode(0);
    const access2 = ast.createArrayAccessNode(1);
    const property = ast.createPropertyNode("name");


    ast.addChild(property, access);
    ast.addChild(property, access2);

    ast.deleteNode(access);
    ast.addParent(access2, root);

    console.log(tokens);
    // console.log(ast.postOrder());
    console.log(ast.toJSON());
  }
}

export const query = new QueryRunner();
