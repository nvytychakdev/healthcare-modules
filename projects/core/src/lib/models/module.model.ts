import { ModuleChartContext } from '../enums/module-chart-type.enum';
import { ModuleConfig } from '../interfaces/module-config.interface';
import { ModuleLineChartRenderer } from './module-chart/module-line-chart-renderer.model';
import { ModuleDataSource } from './module-data-source.model';
import { ModuleSettings } from './module-settings.model';
import { ModuleView } from './module-view.model';

export class Module {
  private _config: ModuleConfig;
  private _settings: ModuleSettings;
  private _dataSource: ModuleDataSource;
  private _view: ModuleView;

  get settings() {
    return this._settings;
  }

  get id() {
    return this._config.id ?? '';
  }

  get moduleId() {
    return this._config.moduleId ?? 'Base';
  }

  get moduleName() {
    return this._config.moduleName ?? this._settings.moduleName;
  }

  get dataSource() {
    return this._dataSource;
  }

  get view() {
    return this._view;
  }

  constructor(moduleConfig: ModuleConfig) {
    this._config = moduleConfig;
    this._settings = new ModuleSettings();
    this._dataSource = new ModuleDataSource();
    this._view = new ModuleView()
      .withChartRenderer(ModuleChartContext.Details, new ModuleLineChartRenderer())
      .withChartRenderer(ModuleChartContext.Overview, new ModuleLineChartRenderer());
  }

  withModuleSettings(moduleSettings: ModuleSettings) {
    this._settings = moduleSettings;
    return this;
  }

  withModuleDataSource(dataSource: ModuleDataSource) {
    this._dataSource = dataSource;
    return this;
  }

  withModuleView(view: ModuleView) {
    this._view = view;
    return this;
  }

  isEnabled() {
    if (!this._config) return false;
    return this._config.status === 'ENABLED';
  }
}
