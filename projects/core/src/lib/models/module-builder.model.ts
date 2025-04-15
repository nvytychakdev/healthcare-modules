import { Type } from '@angular/core';
import { ModuleChartContext } from '../enums/module-chart-type.enum';
import { ModuleConfig } from '../interfaces/module-config.interface';
import { ModuleChartRenderer } from './module-chart-renderer.model';
import { ModuleDataSource } from './module-data-source.model';
import { ModuleFactory } from './module-factory.model';
import { ModuleSettings } from './module-settings.model';
import { ModuleUnit } from './module-unit.model';
import { ModuleView } from './module-view.model';
import { Module } from './module.model';

type ModuleViewComponents = {
  list?: Type<unknown>;
  overview?: Type<unknown>;
  details?: Type<unknown>;
  card?: Type<unknown>;
};

type ModuleContextRenderer = {
  context: ModuleChartContext;
  renderer: ModuleChartRenderer;
};

export class ModuleBuilder {
  private _settings?: ModuleSettings;
  private _dataSource?: ModuleDataSource;
  private _view: ModuleView = new ModuleView();
  private _units?: Map<string, ModuleUnit>;
  private _chartRenderers: Array<ModuleContextRenderer> = [];
  private _viewComponents?: ModuleViewComponents;

  withSettings(settings: ModuleSettings) {
    this._settings = settings;
    return this;
  }

  withDataSource(dataSource: ModuleDataSource) {
    this._dataSource = dataSource;
    return this;
  }

  withView(view: ModuleView) {
    this._view = view;
    return this;
  }

  withViewComponents(components: ModuleViewComponents) {
    this._viewComponents = components;
    return this;
  }

  withUnits(units: Map<string, ModuleUnit>) {
    this._units = units;
    return this;
  }

  withChartRenderer(context: ModuleChartContext, renderer: ModuleChartRenderer) {
    this._chartRenderers.push({ context, renderer });
    return this;
  }

  build(moduleConfig: ModuleConfig): Module {
    if (!this._settings) {
      throw new Error(`${moduleConfig.moduleId} misconfigured. Required settings are missing`);
    }

    this._view = this._view
      .withListViewComponent(this._viewComponents?.list)
      .withOverviewComponent(this._viewComponents?.overview)
      .withDetailViewComponent(this._viewComponents?.details)
      .withCardViewComponent(this._viewComponents?.card);

    this._chartRenderers.forEach(({ context, renderer }) => {
      // set renderers for the view
      this._view.withChartRenderer(context, renderer);
    });

    this._view.getAllChartRenderers().forEach((renderer) => {
      // set units for all renderers
      if (this._units) renderer.withUnits(this._units);
    });

    return ModuleFactory.createModule(moduleConfig, {
      moduleDataSource: this._dataSource,
      moduleSettings: this._settings,
      moduleView: this._view,
      moduleUnits: this._units,
    });
  }
}
