export type DataStreamingType = {
  autoStream: boolean;
  bufferSize: number;
  chunkSize: number;
  dataSize: number;
};

export type ConfigType = {
  saveFile: string | null;
  loadFile: string | null;
  loadUrl: string | null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
  dataStreaming: DataStreamingType;
};

export type OverrideConfigType = Partial<ConfigType>;
