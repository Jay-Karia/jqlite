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
  ARGUMENT = "Argument", // #function(arg1, arg2)
  GREATER_THAN = "GreaterThan", // >
  GREATER_THAN_EQUAL = "GreaterThanEqual", // >=
  LESS_THAN = "LessThan", // <
  LESS_THAN_EQUAL = "LessThanEqual", // <=
  EQUALS = "Equals", // ==
  NOT_EQUALS = "NotEquals", // !=
  WHITESPACE = "WhiteSpace", //
  CONDITION_MARK = "ConditionMark", // ?
  CONTEXT = "Context", // @
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
