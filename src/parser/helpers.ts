/**
 * @fileoverview Helper functions for the Parser.
 * @author Jay-Karia
 */

"use strict";

import { ParserError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
//======================================IMPORTS====================================

import type { Token } from "src/lexer/tokens";

//=================================================================================

export function expect(token: Token[], index: number, type: string): boolean {
  let valid = false;

  const nextToken = token[index + 1];
  if (nextToken) {
    if (nextToken.type === type) {
      valid = true;
    } else {
      throw new ParserError(ERROR_MESSAGES.PARSER.UNEXPECTED_TOKEN, {
        expected: type,
        actual: nextToken.type,
        token: nextToken,
        index: index + 1,
      });
    }
  }

  return valid;
}
