import { ErrorParams } from "./types";

/**
 * All the error messages
 */
export const ERROR_MESSAGES = {
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
      solution:
        "Add default path in config or add file path while using `save()`",
    } as ErrorParams,
    NO_DEFAULT_LOAD_FILE: {
      message: "No default file to load data",
      code: "NO_DEFAULT_LOAD_FILE",
      cause: "Empty load file path in config",
      solution:
        "Add default load file in config or add file path while using `load()`",
    } as ErrorParams,
    NO_DEFAULT_LOAD_URL: {
      message: "No default url to load data",
      code: "NO_DEFAULT_PATH",
      cause: "Empty default url in config",
      solution:
        "Add default url in config or add url while using `loadFromUrl()`",
    } as ErrorParams,
    NO_OVERWRITE: {
      message: "Cannot overwrite file",
      code: "NO_OVERWRITE",
      cause: "Tried to overwrite file without permission",
      solution: "Set `allowOverwrite` to true in config or remove the file",
    } as ErrorParams,
    ERR_EVALUATING_FILE_STATS: {
      message: "Could not evaluate file stats",
      code: "ERR_EVALUATING_FILE_STATS",
      cause:
        "Unexpected error occurred while calculating file stats for data stream",
      solution: "Check whether the file exists and is accessible",
    } as ErrorParams,
    ERR_EVALUATING_URL_STATS: {
      message: "Could not evaluate url stats",
      code: "ERR_EVALUATING_URL_STATS",
      cause:
        "Unexpected error occurred while calculating url stats for data stream",
      solution: "Check whether the url exists and is accessible",
    } as ErrorParams,
  },
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
      solution:
        "Make sure all the required keys are present in the config file",
    } as ErrorParams,
    INVALID_CONFIG_KEYS: {
      message: "Invalid config keys",
      code: "INVALID_CONFIG_KEYS",
      cause: "The config file has invalid keys",
      solution: "Make sure the config file has valid keys",
    } as ErrorParams,
    INVALID_BUFFER_SIZE: {
      message: "Invalid buffer size",
      code: "INVALID_BUFFER_SIZE",
      cause: "The buffer size value is negative or floating",
      solution: "Make the value of buffer size a natural number",
    } as ErrorParams,
    INVALID_CHUNK_SIZE: {
      message: "Invalid chunk size",
      code: "INVALID_CHUNK_SIZE",
      cause: "The chunk size value is negative or floating",
      solution: "Make the value of chunk size a natural number",
    } as ErrorParams,
    INVALID_MIN_DATA_SIZE: {
      message: "Invalid min data size",
      code: "INVALID_MIN_DATA_SIZE",
      cause: "The min data size value is negative or floating",
      solution: "Make the value of min data size a natural number",
    } as ErrorParams,
    ERR_BUFFER_AND_CHUNK_SIZE: {
      message: "Buffer size is less than chunk size",
      code: "ERR_BUFFER_AND_CHUNK_SIZE",
      cause: "The buffer size is less than the chunk size",
      solution:
        "Make sure the buffer size is greater than the chunk size in config",
    } as ErrorParams,
    ERR_BUFFER_AND_MIN_DATA_SIZE: {
      message: "Min data size is greater than buffer size",
      code: "ERR_BUFFER_AND_MIN_DATA_SIZE",
      cause: "The min data size is greater than the buffer size",
      solution:
        "Make sure the minimum data size is less than the buffer size in config",
    } as ErrorParams,
  },
};
