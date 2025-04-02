/**
 * @fileoverview The query runner for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { Token } from "../parser/tokens";
import { lexer } from "../parser/lexer";
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
    ast.createPropertyNode("friends", null, root);

    console.log(tokens);
    console.log(ast);
  }
}

export const query = new QueryRunner();
