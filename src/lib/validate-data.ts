import { DATA_ERRORS } from "constants/errors";
import { DataError } from "utils/errors";
import { readFileSync } from "node:fs";
import { Error } from "../types/error";

function validateJSON(data: string, error: Error): string {
  try {
    return JSON.stringify(JSON.parse(data));
  } catch {
    throw new DataError(error);
  }
}

function validateData(data: string): string {
  const isPath =
    data.startsWith("/") || data.startsWith("./") || data.startsWith("../");

  if (isPath)
    try {
      return validateJSON(
        readFileSync(data, "utf-8"),
        DATA_ERRORS.JSON_FILE_NOT_FOUND
      );
    } catch {
      throw new DataError(DATA_ERRORS.INVALID_PATH);
    }

  return validateJSON(data, DATA_ERRORS.INVALID_JSON);
}

export { validateData };
