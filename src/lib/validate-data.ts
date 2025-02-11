import { DATA_ERRORS } from "constants/errors";
import { DataError } from "utils/errors";
import { readFileSync } from "node:fs";
import { Error } from "../types/error";

function parseJSON(data: string, error: Error): unknown {
  try {
    return JSON.parse(data);
  } catch {
    throw new DataError(error);
  }
}

function validateData(data: string): string {
  const isPath =
    data.startsWith("/") || data.startsWith("./") || data.startsWith("../");

  if (isPath) {
    let contents: string = "";
    try {
      contents = readFileSync(data, "utf-8");
    } catch {
      throw new DataError(DATA_ERRORS.INVALID_PATH);
    }
    parseJSON(contents, DATA_ERRORS.JSON_FILE_NOT_FOUND);
    return contents;
  } else parseJSON(data, DATA_ERRORS.INVALID_JSON);

  return data;
}

export { validateData };
