/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { ast } from "src/ast/ast";
import { expect } from "./helpers";
import {ParserError} from "src/errors/factory";
import {ERROR_MESSAGES} from "src/errors/messages";

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
    // Iterating over tokens
    tokens.forEach((token, index) => {

      //=======================================ROOT========================================

      if (token.type === TokenType.ROOT) ast.createRootNode();

      //=====================================PROPERTY=====================================

      if (token.type === TokenType.DOT) {
        // Expect the next token to be a property
        expect(tokens, index, TokenType.PROPERTY);

        // Get the property token
        const propertyToken = tokens[index + 1];

        // Add the token to the AST
        ast.createPropertyNode(propertyToken.value);

        // Update the index
        index = index + 2;
      }


      if (token.type === TokenType.PROPERTY) {
        // Expect the previous token to be a dot
        expect(tokens, index - 2, TokenType.DOT);

        // Check if the previous node is property node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createPropertyNode(token.value, null, previousNode);
      }

      //===================================ARRAY ACCESS===================================

      if (token.type === TokenType.LEFT_BRACKET) {
        // Expect the next token to be a number
        expect(tokens, index, TokenType.NUMBER);

        // Expect the next token to be a right bracket
        expect(tokens, index + 1, TokenType.RIGHT_BRACKET);

        // Expect the previous token to be a property
        expect(tokens, index - 2, TokenType.PROPERTY);

        // Get the number token
        const numberToken = tokens[index + 1];

        // Check if the previous node is property node
        const previousNode = ast.getRecentNode();
        if (!previousNode || previousNode.type !== "Property") {
          throw new ParserError(ERROR_MESSAGES.PARSER.PROPERTY_NODE_REQUIRED, {
            previousNode,
            currentNode: numberToken,
            expectedNode: "Property",
            index: index + 1,
          });
        }

        // Add the token to the AST with parent as the last property node;
        ast.createArrayAccessNode(Number(numberToken.value), null, previousNode);

        // Update the index
        index++;
      }

      //===================================================================================

    });
  }
}

export const parser = new Parser();
