import { DATA_ERRORS } from "constants/errors";
import { DataError } from "errors";
import { readFileSync } from "node:fs";
import { Error } from "../types/error";
import path from "node:path";

/**
 * Validates the JSON data
 * @param data The input JSON data
 * @param error The type of error to throw
 * @returns The validated JSON data
 */
export function validateJSON(data: string, error: Error): string {
  try {
    return JSON.stringify(JSON.parse(data));
  } catch {
    throw new DataError(error);
  }
}

/**
 * Validates the input JSON data or path to a JSON file
 * @param data The input JSON data or path to a JSON file
 * @returns The JSON data
 */
function validateData(data: string): string | Promise<string> {
  const isPath =
    data.startsWith("/") || data.startsWith("./") || data.startsWith("../");

  if (isPath)
    try {
      data = path.resolve(data);
      return validateJSON(
        readFileSync(data, "utf-8"),
        DATA_ERRORS.JSON_FILE_NOT_FOUND
      );
    } catch {
      throw new DataError(DATA_ERRORS.INVALID_PATH);
    }

  const isUrl = data.startsWith("http://") || data.startsWith("https://");
  if (isUrl)
    return fetch(data)
      .then(res => res.json())
      .catch(() => {
        throw new DataError(DATA_ERRORS.INVALID_URL);
      });

  return validateJSON(data, DATA_ERRORS.INVALID_JSON);
}

export { validateData };
