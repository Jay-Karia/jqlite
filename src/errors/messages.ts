/**
 * @fileoverview Error messages for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ErrorParams } from "./types";

//=================================================================================

/**
 * All the error messages
 */
export const ERROR_MESSAGES = {
  //====================================DATA=========================================
  DATA: {
    INVALID_JSON: {
      message: "Invalid JSON",
      code: "INVALID_JSON",
      cause: "Error parsing JSON data",
      solution: "Make sure the data is a valid JSON",
    } as ErrorParams,
    INVALID_FILE_PATH: {
      message: "Invalid file path",
      code: "INVALID_FILE_PATH",
      cause: "The file path doesn't exist",
      solution: "Make sure the file path is valid and accessible",
    } as ErrorParams,
    INVALID_JSON_URL: {
      message: "Invalid JSON URL",
      code: "INVALID_JSON_URL",
      cause: "The URL you're trying to read doesn't have a valid JSON",
      solution: "Make sure the URL exists and has a valid JSON",
    } as ErrorParams,
    NO_DATA: {
      message: "No data to save",
      code: "NO_DATA",
      cause: "There's no data to save",
      solution: "Make sure you have data to save from memory",
    } as ErrorParams,
    NO_DATA_TO_LOAD: {
      message: "No data to load",
      code: "NO_DATA_TO_LOAD",
      cause: "There's no data to load",
      solution: "Make sure you have data to load from a file or URL",
    } as ErrorParams,
    CANNOT_LOAD_URL_DATA: {
      message: "Cannot load URL data",
      code: "CANNOT_LOAD_URL_DATA",
      cause: "Error loading data from a URL",
      solution: "Make sure the URL is valid and the data is accessible",
    } as ErrorParams,
    CANNOT_LOAD_FILE_DATA: {
      message: "Cannot load file data",
      code: "CANNOT_LOAD_FILE_DATA",
      cause: "Error loading data from a file",
      solution: "Make sure the file exists and is accessible",
    } as ErrorParams,
    INVALID_DEFAULT_PATH: {
      message: "Invalid default file path",
      code: "INVALID_DEFAULT_PATH",
      cause: "Tried to add invalid default path in config",
      solution: "Update the `defaultPath` key in config to valid one",
    } as ErrorParams,
    NO_DEFAULT_SAVE_FILE: {
      message: "No default path to save data",
      code: "NO_DEFAULT_SAVE_FILE",
      cause: "Empty default path in config",
      solution: "Add default path in config or add file path while using `save()`",
    } as ErrorParams,
    NO_DEFAULT_LOAD_FILE: {
      message: "No default file to load data",
      code: "NO_DEFAULT_LOAD_FILE",
      cause: "Empty load file path in config",
      solution: "Add default load file in config or add file path while using `load()`",
    } as ErrorParams,
    NO_DEFAULT_LOAD_URL: {
      message: "No default url to load data",
      code: "NO_DEFAULT_PATH",
      cause: "Empty default url in config",
      solution: "Add default url in config or add url while using `loadFromUrl()`",
    } as ErrorParams,
  },
  //====================================CONFIG=======================================
  CONFIG: {
    CONFIG_FILE_NOT_FOUND: {
      message: "Config file not found",
      code: "CONFIG_FILE_NOT_FOUND",
      cause: "The config file doesn't exist",
      solution: "Make sure the config file exists and is accessible",
    } as ErrorParams,
    NOT_JSON_CONFIG: {
      message: "Config file is not a valid JSON",
      code: "NOT_JSON_CONFIG",
      cause: "The config file is not a valid JSON",
      solution: "Make sure the config file is a valid JSON",
    } as ErrorParams,
    INVALID_CONFIG_FILE: {
      message: "Invalid config file",
      code: "INVALID_CONFIG_FILE",
      cause: "The file is not a valid config file",
      solution: "Make sure all the required keys are present in the config file",
    } as ErrorParams,
    INVALID_CONFIG_KEYS: {
      message: "Invalid config keys",
      code: "INVALID_CONFIG_KEYS",
      cause: "The config file has invalid keys",
      solution: "Make sure the config file has valid keys",
    } as ErrorParams,
    INVALID_CONFIG_VALUE: {
      message: "Invalid config value",
      code: "INVALID_CONFIG_VALUES",
      cause: "The config file has invalid value",
      solution: "Make sure the config file has a valid value",
    } as ErrorParams,
  },
  //===================================PARSER========================================
  PARSER: {
    ROOT_REQUIRED: {
      message: "Root selector required",
      code: "ROOT_REQUIRED",
      cause: "The AST is empty",
      solution: "Add the '$' character to the query",
    } as ErrorParams,
    CHILD_NOT_FOUND: {
      message: "Child not found",
      code: "CHILD_NOT_FOUND",
      cause: "The child node is not present in the parent node",
      solution: "Make sure the child node is present in the parent node",
    } as ErrorParams,
    UNEXPECTED_TOKEN: {
      message: "Unexpected token",
      code: "UNEXPECTED_TOKEN",
      cause: "The token is not valid",
      solution: "Make sure the token is valid",
    } as ErrorParams,
    PROPERTY_NODE_REQUIRED: {
      message: "Property node required",
      code: "PROPERTY_NODE_REQUIRED",
      cause: "The previous node is not a property node",
      solution: "Make sure the previous node is a property node before using array access",
    } as ErrorParams,
    MULTIPLE_TRUE: {
      message: "Multiple select/omit is on",
      code: "MULTIPLE_TRUE",
      cause: "The multiple select/omit is on",
      solution: "Make sure the multiple select/omit is off before end of query. Use `)` to turn off multiple select/omit",
    } as ErrorParams,
    MULTIPLE_FALSE: {
      message: "Multiple select/omit is off",
      code: "MULTIPLE_TRUE",
      cause: "The multiple select/omit is off",
      solution: "Make sure the multiple select/omit is on before using right parenthesis. Use `(` to turn on multiple select/omit",
    } as ErrorParams,
    MULTIPLE_SELECT_COMMA: {
      message: "Cannot use comma without multiple select/omit",
      code: "MULTIPLE_SELECT_COMMA",
      cause: "Tried to use comma `,` when multiple select/emit is off",
      solution: "Remove comma `,` or use multiple select/emit",
    } as ErrorParams,
    INVALID_FUNCTION_NAME: {
      message: "Invalid function name",
      code: "INVALID_FUNCTION_NAME",
      cause: "The function name is not valid",
      solution: "Make sure the function name is valid",
    } as ErrorParams,
    INVALID_COMPARISON_OPERATOR: {
      message: "Invalid comparison operator",
      code: "INVALID_COMPARISON_OPERATOR",
      cause: "The comparison operator is not valid",
      solution: "Make sure the comparison operator is valid",
    } as ErrorParams,
    UNKNOWN_TOKEN: {
      message: "Unknown token encountered",
      code: "UNKNOWN_TOKEN",
      cause: "Unrecognized token used",
      solution: "Use a valid token",
    } as ErrorParams,
    BRACKET_MISMATCH: {
      message: "Bracket mismatch",
      code: "BRACKET_MISMATCH",
      cause: "The brackets are not matching",
      solution: "Make sure the brackets are matching",
    } as ErrorParams,
    PARENTHESIS_MISMATCH: {
      message: "Parenthesis mismatch",
      code: "PARENTHESIS_MISMATCH",
      cause: "The parenthesis are not matching",
      solution: "Make sure the parenthesis are matching",
    } as ErrorParams,
    ERR_NESTED_CONDITIONS: {
      message: "Nested conditions are not allowed",
      code: "ERR_NESTED_CONDITIONS",
      cause: "The condition is nested",
      solution: "Make sure the condition is not nested",
    } as ErrorParams,
  },
  //===================================EVALUATOR======================================
  EVALUATOR: {
    EMPTY_ROOT_NODE: {
      message: "Empty root node",
      code: "EMPTY_ROOT_NODE",
      cause: "The root node is empty",
      solution: "Make sure the query is valid and has a root selector: '$'",
    } as ErrorParams,
    EMPTY_DATA: {
      message: "Empty data",
      code: "EMPTY_DATA",
      cause: "The data is empty",
      solution: "Make sure you set the data in memory",
    } as ErrorParams,
    UNKNOWN_NODE_TYPE: {
      message: "Unknown node type",
      code: "UNKNOWN_NODE_TYPE",
      cause: "The node type is not valid",
      solution: "Make sure the node type is valid",
    } as ErrorParams,
    PROPERTY_NOT_FOUND: {
      message: "Property not found",
      code: "PROPERTY_NOT_FOUND",
      cause: "The property is not present in the data",
      solution: "Make sure the property is present in the data",
    } as ErrorParams,
    NOT_AN_ARRAY: {
      message: "Not an array",
      code: "NOT_AN_ARRAY",
      cause: "The property you are trying to index is not an array",
      solution: "Make sure the property is an array",
    } as ErrorParams,
    ERR_ARRAY_INDEX_NOT_DEFINED: {
      message: "Array index not defined",
      code: "ERR_ARRAY_INDEX_NOT_DEFINED",
      cause: "The array index is not defined",
      solution: "Make sure the array index is defined",
    } as ErrorParams,
    ARRAY_INDEX_OUT_OF_BOUNDS: {
      message: "Array index out of bounds",
      code: "ARRAY_INDEX_OUT_OF_BOUNDS",
      cause: "The array index is out of bounds",
      solution: "Make sure the array index is within the bounds of the array",
    } as ErrorParams,
    ARRAY_VALUE_NOT_FOUND: {
      message: "Array value not found",
      code: "ARRAY_VALUE_NOT_FOUND",
      cause: "The value is not present in the array",
      solution: "Make sure the value is present in the array",
    } as ErrorParams,
    ERR_WILDCARD: {
      message: "Error occurred while evaluating wildcard",
      code: "ERR_WILDCARD",
      cause: "Undefined value of the array",
      solution: "Check whether the array exists or not",
    } as ErrorParams,
    NO_OBJECTS: {
      message: "No objects allowed",
      code: "NO_OBJECTS",
      cause: "The array does not have objects",
      solution: "Make sure that the value is an array of objects",
    } as ErrorParams,
    ERR_SLICE_RANGE: {
      message: "Error in array slice",
      code: "ERR_SLICE_RANGE",
      cause: "Could not get slice range",
      solution: "Make sure that the slice range value is valid",
    } as ErrorParams,
    INVALID_SLICE_RANGE: {
      message: "Invalid slice range",
      code: "INVALID_SLICE_RANGE",
      cause: "Array slice range is out of bonds",
      solution: "Make sure that the slice range is within the array length",
    } as ErrorParams,
    ERR_EMIT_PROPERTY: {
      message: "Error in emit property",
      code: "ERR_EMIT_PROPERTY",
      cause: "Could not get emit property",
      solution: "Make sure that the emit property is valid",
    } as ErrorParams,
    ERR_NOT: {
      message: "Error occurred while evaluating not",
      code: "ERR_NOT",
      cause: "Undefined value of the not operator",
      solution: "Check whether the not operator is valid",
    } as ErrorParams,
    ERR_NO_KEYS: {
      message: "No keys found",
      code: "ERR_NO_KEYS",
      cause: "Undefined value of selected keys",
      solution: "Check whether the selected keys are valid",
    } as ErrorParams,
    ERR_ARRAY: {
      message: "Error occurred while evaluating array",
      code: "ERR_ARRAY",
      cause: "Undefined value of the array",
      solution: "Check whether the array is valid",
    },
    ERR_FUNCTION_CATEGORY: {
      message: "Error occurred while evaluating function category",
      code: "ERR_FUNCTION_CATEGORY",
      cause: "Undefined value of the function category",
      solution: "Check whether the function category is valid",
    } as ErrorParams,
    ERR_NUMERIC_ARRAY: {
      message: "Error occurred while evaluating numeric array",
      code: "ERR_NUMERIC_ARRAY",
      cause: "The data is not a numeric array",
      solution: "Make sure the data is a numeric array",
    } as ErrorParams,
    ERR_FUNCTION_APPLY: {
      message: "Error occurred while applying function",
      code: "ERR_FUNCTION_APPLY",
      cause: "Undefined value of the function name",
      solution: "Check whether the function declaration is valid",
    } as ErrorParams,
    ERR_MULTIPLE_SELECT: {
      message: "Error occurred while evaluating multiple select",
      code: "ERR_MULTIPLE_SELECT",
      cause: "Undefined value of the multiple select",
      solution: "Check whether the multiple select is valid",
    } as ErrorParams,
    ERR_FUNCTION_NAME: {
      message: "Error occurred while evaluating function name",
      code: "ERR_FUNCTION_NAME",
      cause: "Undefined value of the function name",
      solution: "Check whether the function name is valid",
    },
    INVALID_NUMBER_OF_ARGS: {
      message: "Invalid number of arguments",
      code: "INVALID_NUMBER_OF_ARGS",
      cause: "The number of arguments is not valid",
      solution: "Make sure the number of arguments is valid",
    } as ErrorParams,
    INVALID_ARGUMENTS: {
      message: "Invalid arguments",
      code: "INVALID_ARGUMENTS",
      cause: "The arguments are not valid",
      solution: "Make sure the arguments are valid",
    } as ErrorParams,
    ERR_ARRAY_OF_NON_PRIMITIVES: {
      message: "Error occurred while evaluating array of non primitives",
      code: "ERR_ARRAY_OF_NON_PRIMITIVES",
      cause: "The data is an array of non primitives",
      solution: "Make sure the data is an array of primitives",
    } as ErrorParams,
    NOT_A_STRING: {
      message: "Not a string",
      code: "NOT_A_STRING",
      cause: "The data is not a string",
      solution: "Make sure the data is a string",
    } as ErrorParams,
    NO_QUOTES: {
      message: "No quotes",
      code: "NO_QUOTES",
      cause: "The string is not quoted",
      solution: "Make sure the string is quoted or change the config option: quotedArguments to false",
    } as ErrorParams,
    NOT_A_NUMBER: {
      message: "Not a number",
      code: "NOT_A_NUMBER",
      cause: "The data is not a number",
      solution: "Make sure the data is a number",
    } as ErrorParams,
    ERR_COMPARISON_OPERATOR: {
      message: "Error occurred while evaluating comparison",
      code: "ERR_COMPARISON_OPERATOR",
      cause: "Undefined value of the comparison operator",
      solution: "Check whether the comparison operator is valid",
    } as ErrorParams,
    ERR_COMPARISON_VALUE: {
      message: "Error occurred while evaluating comparison value",
      code: "ERR_COMPARISON_VALUE",
      cause: "Undefined value of the comparison value",
      solution: "Check whether the comparison value is valid",
    } as ErrorParams,
    EMPTY_CONDITION: {
      message: "Empty condition",
      code: "EMPTY_CONDITION",
      cause: "The condition is empty",
      solution: "Make sure the condition is valid",
    } as ErrorParams,
    CONDITION_NOT_BOOLEAN: {
      message: "Condition is not boolean",
      code: "CONDITION_NOT_BOOLEAN",
      cause: "The condition is not boolean",
      solution: "Make sure the condition is boolean",
    } as ErrorParams,
    ERR_LOGICAL_OPERATOR: {
      message: "Error occurred while evaluating logical operator",
      code: "ERR_LOGICAL_OPERATOR",
      cause: "Undefined value of the logical operator",
      solution: "Check whether the logical operator is valid",
    } as ErrorParams,
  },
};
