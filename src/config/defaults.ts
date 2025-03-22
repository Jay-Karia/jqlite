import { DefaultConfigType } from "./types";

export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";

export const DEFAULT_CONFIG: DefaultConfigType = {
  saveFile: null,
  loadFile: null,
  loadUrl: null,
  allowOverwrite: false,
  createIfMissing: true,
};
