/**
 * @fileoverview Query evaluator
 * @author Jay-Karia
 */

"use strict";

import { ast } from "src/ast/ast";
//======================================IMPORTS======================================

import type { RootNode } from "src/ast/nodes";
import { dataStore } from "src/data/store";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

//===================================================================================

/**
 * Evaluator class
 * @description This class is responsible for evaluating the query.
 */
export class Evaluator {
  //===================================PROPERTIES===================================

  private readonly _result: unknown;
  private _data: unknown;

  //===================================CONSTRUCTOR==================================

  /**
   * Initializes the evaluator
   */
  constructor() {
    this._result = null;
    this._data = null;
  }

  //===================================METHODS=====================================

  /**
   * Evaluates the query
   */
  public evaluate(): void {
    // Get the root node
    const root: RootNode | null = ast.getRootNode();

    // Check if the root node is null
    if (!root) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_ROOT_NODE, {
        root,
      });
    }

    // Get the data to work one
    const data: unknown = dataStore.get();
    if (!data) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_DATA, {
        memoryData: data
      });
    }
    this._data = data;

    console.log(ast.preOrder());
  }

  /**
   * Get the result of the evaluation
   * @returns {unknown} The result of the evaluation
   */
  public getResult(): unknown {
    return this._result;
  }

  //===============================================================================
}

export const evaluator = new Evaluator();
