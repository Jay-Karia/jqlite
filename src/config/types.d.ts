export type ConfigType = {
  defaultPath?: string | null,
  allowOverwrite?: boolean,
  createIfMissing?: boolean,
}

export type DefaultConfigType = {
  defaultPath: null;
  allowOverwrite: boolean;
  createIfMissing: boolean;
}
