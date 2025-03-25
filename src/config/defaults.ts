import type { ConfigType } from "./types";

export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";

export const DEFAULT_CONFIG: ConfigType = {
  saveFile: null,
  loadFile: null,
  loadUrl: null,
  allowOverwrite: false,
  createIfMissing: true,
  dataStreaming: {
    autoStream: true,
    bufferSize: 262144, // 256KB
    chunkSize: 32768, // 32KB
    dataSize: 1048576, // 1MB
  },
};
