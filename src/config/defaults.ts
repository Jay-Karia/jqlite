import type { ConfigType } from "./types";

export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";

export const DEFAULT_CONFIG: ConfigType = {
  loadFile: null,
  fetchUrl: null,
  allowOverwrite: false,
  createIfMissing: true,
};
