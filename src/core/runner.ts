/**
 * @fileoverview The query runner for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { Token } from "../lexer/tokens";
import { lexer } from "../lexer/lexer";
import { parser } from "src/parser/parser";
import { evaluator } from "./evaluator";

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
   */
  public run(query: string): void {
    // Remove leading and trailing white spaces
    query = query.trim();

    // Parse the tokens
    const tokens: Token[] = lexer.tokenize(query);
    parser.parse(tokens);

    // Evaluate the query
    evaluator.evaluate();

    // Get the result
    const result: unknown = evaluator.getResult();
    console.log(`Result: ${result}`);
  }
}

export const query = new QueryRunner();
