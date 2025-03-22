import { DefaultConfigType } from "./types";

export const DEFAULT_CONFIG_FILE_NAME = "jqlite.json";

export const DEFAULT_CONFIG: DefaultConfigType = {
  saveFile: null,
  loadFile: null,
  loadUrl: null,
  allowOverwrite: false,
  createIfMissing: true,
  dataStreaming: {
    enabled: true,
    bufferSize: 262144, // 256KB
    chunkSize: 32768, // 32KB
    minDataSize: 1048576, // 1MB
  },
};
