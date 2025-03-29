import { ModuleConfig } from '../interfaces/module-config.interface';
import { ModuleDataSource } from './module-data-source.model';
import { ModuleSettings } from './module-settings.model';

export class Module {
  private _config?: ModuleConfig;
  private _settings: ModuleSettings;
  private _dataSource: ModuleDataSource;

  get settings() {
    return this._settings;
  }

  get id() {
    return this._config?.id || '';
  }

  get moduleId() {
    return this._config?.moduleId || 'Base';
  }

  get moduleName() {
    return this._config?.moduleName || this._settings.moduleName;
  }

  get dataSource() {
    return this._dataSource;
  }

  constructor(moduleConfig: ModuleConfig) {
    this._config = moduleConfig;
    this._settings = new ModuleSettings();
    this._dataSource = new ModuleDataSource();
  }

  withModuleSettings(moduleSettings: ModuleSettings) {
    this._settings = moduleSettings;
    return this;
  }

  withModuleDataSource(dataSource: ModuleDataSource) {
    this._dataSource = dataSource;
    return this;
  }

  isEnabled() {
    if (!this._config) return false;
    return this._config.status === 'ENABLED';
  }
}
