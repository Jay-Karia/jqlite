import {readFileSync} from "fs";
import {parseJson} from "./utils";

/**
 * Load data from a URL
 * @param url The URL to fetch data from
 * @returns The fetched data
 */
export async function loadUrlData(url: string): Promise<object | null> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading URL data", error);
    return null;
  }
}

/**
 * Load data from a file
 * @param path The file path to load data from
 * @returns The loaded data
 */
export function loadFromFile(path: string): object | null {
  try {
    const data = readFileSync(path, "utf-8");
    return parseJson(data);
  } catch (error) {
    console.error("Error loading file data", error);
    return null;
  }
}
