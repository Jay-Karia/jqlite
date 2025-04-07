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
