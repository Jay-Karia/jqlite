export type ConfigType = {
  defaultSaveFile?: string | null;
  allowOverwrite?: boolean;
  createIfMissing?: boolean;
};

export type DefaultConfigType = {
  defaultSaveFile: null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
};
