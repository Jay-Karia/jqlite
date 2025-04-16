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
import { ast } from "src/ast/ast";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import { dataStore } from "src/data/store";

//=================================================================================

/**
 * Query runner class
 * @description This class is responsible for running the query.
 */
export class QueryRunner {
  private _result: unknown = null;

  /**
   * Runs the query
   * @description Runs the query and returns the result
   * @param {string} query The query to run
   */
  public run(query: string, callback?: (result: unknown) => void): void {
    // Remove leading and trailing white spaces
    query = query.trim();

    // Parse the tokens
    const tokens: Token[] = lexer.tokenize(query);
    parser.parse(tokens);

    // Get the root node
    const root = ast.getRootNode();
    if (!root) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_ROOT_NODE, {
        root,
      });
    }

    // Get the data from memory
    const data = dataStore.get();
    if (!data) {
      throw new EvaluatorError(ERROR_MESSAGES.DATA.NO_DATA, {
        data,
      });
    }

    // Set the data in evaluator
    evaluator.setData(data);

    // Evaluate the query
    evaluator.evaluate(root);

    // Get the query result
    this._result = evaluator.getResult();

    // Use the callback if given
    if (callback) callback(this._result);
  }

  /**
   * Returns the result of the query
   * @description Returns the result of the query
   * @returns {unknown} The result of the query
   */
  public result(): unknown {
    return this._result;
  }

  /**
   * Returns the result of the query as a string
   * @description Returns the result of the query as a string
   * @returns {string} The result of the query as a string
   */
  public print(): void {
    console.log(this._result);
  }
}

export const query = new QueryRunner();
