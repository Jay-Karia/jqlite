import {ErrorParams} from "./types";

export const ERROR_MESSAGES = {
  DATA: {
    INVALID_JSON: {
      message: 'Invalid JSON',
      code: 'INVALID_JSON',
    } as ErrorParams,
    INVALID_FILE_PATH: {
      message: 'Invalid file path',
      code: 'INVALID_FILE_PATH',
    } as ErrorParams,
    JSON_FILE_NOT_FOUND: {
      message: 'JSON file not found',
      code: 'JSON_FILE_NOT_FOUND',
      cause: "The file you're trying to read doesn't have a valid JSON",
      solution: 'Make sure the file exists and has a valid JSON',
    } as ErrorParams,
    INVALID_JSON_URL: {
      message: 'Invalid JSON URL',
      code: 'INVALID_JSON_URL',
      cause: "The URL you're trying to read doesn't have a valid JSON",
      solution: 'Make sure the URL exists and has a valid JSON',
    } as ErrorParams,
  }
};
