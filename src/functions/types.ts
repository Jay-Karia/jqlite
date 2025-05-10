/**
 * @fileoverview Function types for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================EXPORTS====================================

export enum functionNames {
  MIN = "min",
  MAX = "max",
  AVG = "avg",
  SUM = "sum",
  COUNT = "count",
  SORT = "sort",
  REVERSE = "reverse",
  UNIQUE = "unique",
  CONTAINS = "contains",
  LENGTH = "length",
  SUBSTRING = "substring",
  UPPER = "upper",
  LOWER = "lower",
  EQUALS = "equals",
  IS_TRUE = "isTrue",
  IS_FALSE = "isFalse",
}
export enum functionCategories {
  NUMERIC_ARRAY = "numericArray",
  ARRAY = "array",
  STRING = "string",
  BOOLEAN = "boolean",
}
export const functionCategoryMap: Record<functionNames, functionCategories> = {
  // Numeric Array
  [functionNames.MIN]: functionCategories.NUMERIC_ARRAY,
  [functionNames.MAX]: functionCategories.NUMERIC_ARRAY,
  [functionNames.AVG]: functionCategories.NUMERIC_ARRAY,
  [functionNames.SUM]: functionCategories.NUMERIC_ARRAY,
  // Array
  [functionNames.COUNT]: functionCategories.ARRAY,
  [functionNames.SORT]: functionCategories.ARRAY,
  [functionNames.REVERSE]: functionCategories.ARRAY,
  [functionNames.UNIQUE]: functionCategories.ARRAY,
  // String
  [functionNames.CONTAINS]: functionCategories.STRING,
  [functionNames.LENGTH]: functionCategories.STRING,
  [functionNames.SUBSTRING]: functionCategories.STRING,
  [functionNames.UPPER]: functionCategories.STRING,
  [functionNames.LOWER]: functionCategories.STRING,
  [functionNames.EQUALS]: functionCategories.STRING,
  // Boolean
  [functionNames.IS_TRUE]: functionCategories.BOOLEAN,
  [functionNames.IS_FALSE]: functionCategories.BOOLEAN,
};
export const functionArgsNumber: Record<functionNames, number[]> = {
  [functionNames.MIN]: [0],
  [functionNames.MAX]: [0],
  [functionNames.AVG]: [0],
  [functionNames.SUM]: [0],
  [functionNames.COUNT]: [0],
  [functionNames.SORT]: [0, 1],
  [functionNames.REVERSE]: [0],
  [functionNames.UNIQUE]: [0],
  [functionNames.CONTAINS]: [1],
  [functionNames.LENGTH]: [0],
  [functionNames.SUBSTRING]: [2],
  [functionNames.UPPER]: [0],
  [functionNames.LOWER]: [0],
  [functionNames.EQUALS]: [1],
  [functionNames.IS_TRUE]: [0],
  [functionNames.IS_FALSE]: [0],
};
export type SortArgs = "asc" | "desc";
export const sortArgs: SortArgs[] = ["asc", "desc"];
export type SubstringArgs = {
  start: number;
  end: number;
};
export type substringArgs = [number, number];

//==================================================================================
