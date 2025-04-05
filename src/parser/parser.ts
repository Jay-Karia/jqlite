/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { Token } from "src/lexer/tokens";
import { ast } from "src/ast/ast";

//=================================================================================

/**
 * Parser class
 * @description This class is responsible for parsing the tokens into an AST.
 */
export class Parser {
  /**
   * Parse the tokens into an AST
   * @param {Token[]} tokens The tokens of the query
   */
  public parse(tokens: Token[]): void {
    ast.createRootNode();

    console.log(tokens);
  }
}

export const parser = new Parser();
