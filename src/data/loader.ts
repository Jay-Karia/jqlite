/**
 * @fileoverview Loader for jqlite data.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { readFileSync } from "fs";
import { parseJson } from "./utils";
import { DataError } from "../errors/factory";
import { ERROR_MESSAGES } from "../errors/messages";

//=================================================================================

/**
 * Load data from a URL
 * @param {string} url The URL to fetch data from
 * @returns {Promise<object | null>} The fetched data
 */
export async function loadFromUrl(url: string): Promise<Record<string, unknown>> {
  let urlData;
  try {
    const response = await fetch(url);
    urlData = await response.json();
    return urlData;
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_URL_DATA, {
      url,
    });
  }
}

/**
 * Load data from a file
 * @param {string} path The file path to load data from
 * @returns {object | null} The loaded data
 */
export function loadFromFile(path: string): Record<string, unknown> {
  let data;
  try {
    data = readFileSync(path, "utf-8");
    return parseJson(data);
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_FILE_DATA, {
      filePath: path,
    });
  }
}
