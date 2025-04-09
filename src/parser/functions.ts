/**
 * @fileoverview Functions for jqlite.
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
};

//==================================================================================
