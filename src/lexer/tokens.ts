/**
 * @fileoverview Tokens for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=======================================TYPES====================================

export enum TokenType {
  ROOT = "Root", // $
  DOT = "Dot", // .
  PROPERTY = "Property", // name
  LEFT_BRACKET = "LeftBracket", // [
  RIGHT_BRACKET = "RightBracket", // ]
  NUMBER = "Number", // 0
  FALL_MARK = "FallMark", // ??
  FALLBACK = "Fallback", // ''
  WILDCARD = "Wildcard", // *
  SLICE = "Slice", // :
  NOT = "Not", // !
  COMMA = "Comma", // ,
  LEFT_PARENTHESIS = "LeftParenthesis", // (
  RIGHT_PARENTHESIS = "RightParenthesis", // )
  DECLARATION = "Declaration", // #
  FUNCTION = "Function", // #function
  WHITESPACE = "WhiteSpace", //
  EOQ = "EndOfQuery", // End Of Query
  UNKNOWN = "Unknown", // Unknown token
}
export interface Token {
  value: string;
  type: TokenType;
  position: number;
  length: number;
}

//=================================================================================
