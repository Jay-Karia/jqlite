/**
 * @fileoverview Function arguments for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type {ASTNode} from "src/ast/types";
import {functionArgsNumber} from "./types";
import {EvaluatorError} from "src/errors/factory";
import {ERROR_MESSAGES} from "src/errors/messages";

//===============================================================================

export function checkNumberOfArgs(node: ASTNode): void {
  const functionName = node.functionName;
  if (!functionName) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_FUNCTION_NAME, {
      functionName,
      type: node.type
    });
  }

  const expectedArgs = functionArgsNumber[functionName];
  const actualArgs = node.functionArgs;

  if (!actualArgs || actualArgs.length !== expectedArgs) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_NUMBER_OF_ARGS, {
      functionName,
      type: node.type,
      expectedNumber: expectedArgs,
      actualNumber: actualArgs ? actualArgs.length : 0,
      arguments: actualArgs
    });
  }

}
