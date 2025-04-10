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
}
export enum functionCategories {
  NUMERIC_ARRAY = "numericArray",
  ARRAY = "array",
}
export const functionCategoryMap: Record<functionNames, functionCategories> = {
  [functionNames.MIN]: functionCategories.NUMERIC_ARRAY,
  [functionNames.MAX]: functionCategories.NUMERIC_ARRAY,
  [functionNames.AVG]: functionCategories.NUMERIC_ARRAY,
  [functionNames.SUM]: functionCategories.NUMERIC_ARRAY,
  [functionNames.COUNT]: functionCategories.ARRAY,
  [functionNames.SORT]: functionCategories.ARRAY,
  [functionNames.REVERSE]: functionCategories.ARRAY,
  [functionNames.UNIQUE]: functionCategories.ARRAY,
};
export const functionArgsNumber: Record<functionNames, number> = {
  [functionNames.MIN]: 0,
  [functionNames.MAX]: 0,
  [functionNames.AVG]: 0,
  [functionNames.SUM]: 0,
  [functionNames.COUNT]: 0,
  [functionNames.SORT]: 1,
  [functionNames.REVERSE]: 0,
  [functionNames.UNIQUE]: 0,
};


//==================================================================================
