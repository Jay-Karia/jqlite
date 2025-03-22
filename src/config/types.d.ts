export type ConfigType = {
  saveFile?: string | null;
  loadFile?: string | null;
  allowOverwrite?: boolean;
  createIfMissing?: boolean;
};

export type DefaultConfigType = {
  saveFile: string | null;
  loadFile: string | null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
};
