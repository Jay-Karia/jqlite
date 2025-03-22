import { DefaultConfigType } from "./types";

export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";

export const DEFAULT_CONFIG: DefaultConfigType = {
  defaultSaveFile: null,
  allowOverwrite: false,
  createIfMissing: true,
};
