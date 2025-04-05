/**
 * @fileoverview The query runner for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { Token } from "../lexer/tokens";
import { lexer } from "../lexer/lexer";
import { ast } from "../ast/ast";
import {parser} from "src/parser/parser";

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
    parser.parse(tokens);

    console.log(ast.postOrder());
  }
}

export const query = new QueryRunner();
