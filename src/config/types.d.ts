export type ConfigType = {
  loadFile: string | null;
  fetchUrl: string | null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
};

export type OverrideConfigType = Partial<ConfigType>;
