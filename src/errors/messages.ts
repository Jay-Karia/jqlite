import {ErrorParams} from "./types";

/**
 * All the error messages
 */
export const ERROR_MESSAGES = {
  DATA: {
    INVALID_JSON: {
      message: 'Invalid JSON',
      code: 'INVALID_JSON',
      cause: "Error parsing JSON data",
      solution: "Make sure the data is a valid JSON",
    } as ErrorParams,
    INVALID_FILE_PATH: {
      message: 'Invalid file path',
      code: 'INVALID_FILE_PATH',
    } as ErrorParams,
    INVALID_JSON_URL: {
      message: 'Invalid JSON URL',
      code: 'INVALID_JSON_URL',
      cause: "The URL you're trying to read doesn't have a valid JSON",
      solution: 'Make sure the URL exists and has a valid JSON',
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
  }
};
