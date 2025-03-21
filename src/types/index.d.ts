export type JQLiteInstances = {
  queryRunner?: QueryRunner;
  dataManager?: DataManager;
  configManager?: ConfigManager;
}

export type JQLiteEnable = {
  queryRunner: boolean;
  dataManager: boolean;
  configManager: boolean;
}
