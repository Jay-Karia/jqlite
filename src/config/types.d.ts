export type DataStreamingType = {
  enabled?: boolean;
  bufferSize?: number;
  chunkSize?: number;
  minDataSize?: number;
};

export type ConfigType = {
  saveFile?: string | null;
  loadFile?: string | null;
  loadUrl?: string | null;
  allowOverwrite?: boolean;
  createIfMissing?: boolean;
  dataStreaming?: DataStreamingType;
};

export type DefaultConfigType = {
  saveFile: string | null;
  loadFile: string | null;
  loadUrl: string | null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
  dataStreaming: {
    enabled: boolean;
    bufferSize: number;
    chunkSize: number;
    minDataSize: number;
  };
};
