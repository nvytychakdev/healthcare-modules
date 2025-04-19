import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { ModuleConfig } from '../interfaces/module-config.interface';
import { ModuleLineChartRenderer } from './module-chart/module-line-chart-renderer.model';
import { ModuleDataSource } from './module-data-source.model';
import { PREFERRED_UNIT_DATA_TRANSFORMER_FN } from './module-data-transformers/module-data-transformers-default.model';
import { ModuleSettings } from './module-settings.model';
import { ModuleUnit } from './module-unit.model';
import { ModuleValueResolver } from './module-value-resolver.model';
import { ModuleView } from './module-view.model';

export class Module {
  private _config: ModuleConfig;
  private _settings: ModuleSettings;
  private _dataSource: ModuleDataSource;
  private _view: ModuleView;
  private _valueResolver: ModuleValueResolver;

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

  get valueResolver() {
    return this._valueResolver;
  }

  constructor(moduleConfig: ModuleConfig) {
    this._config = moduleConfig;
    this._settings = new ModuleSettings();
    this._dataSource = new ModuleDataSource()
      .withModule(this)
      .withDataTransformer(PREFERRED_UNIT_DATA_TRANSFORMER_FN);
    this._valueResolver = new ModuleValueResolver().withModule(this);
    this._view = new ModuleView()
      .withChartRenderer(ModuleChartContext.OverlayVitals, new ModuleLineChartRenderer())
      .withChartRenderer(ModuleChartContext.Details, new ModuleLineChartRenderer())
      .withChartRenderer(ModuleChartContext.Overview, new ModuleLineChartRenderer());
  }

  withModuleSettings(moduleSettings?: ModuleSettings) {
    if (moduleSettings) this._settings = moduleSettings;
    return this;
  }

  withModuleDataSource(dataSource?: ModuleDataSource) {
    if (dataSource) this._dataSource = dataSource.withModule(this);
    return this;
  }

  withModuleView(view?: ModuleView) {
    if (view) this._view = view;
    return this;
  }

  withModuleUnits(units?: Map<string, ModuleUnit>) {
    this._valueResolver.withModuleUnits(units);
    return this;
  }

  withModuleValueResolver(resolver: ModuleValueResolver) {
    if (resolver) this._valueResolver = resolver.withModule(this);
    return this;
  }

  isEnabled() {
    if (!this._config) return false;
    return this._config.status === 'ENABLED';
  }
}
