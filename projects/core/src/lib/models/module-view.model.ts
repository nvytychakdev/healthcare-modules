import { Type } from '@angular/core';
import {
  ModuleDetailsComponent,
  ModuleListViewComponent,
  ModuleOverviewCardComponent,
} from '../../public-api';
import { ModuleChartContext } from '../enums/module-chart-type.enum';
import { ModuleChartRenderer } from './module-chart-renderer.model';

export class ModuleView {
  private _listView: Type<unknown> = ModuleListViewComponent;
  private _overview: Type<unknown> = ModuleOverviewCardComponent;
  private _detailView: Type<unknown> = ModuleDetailsComponent;
  private _chartRenderers: Map<ModuleChartContext, ModuleChartRenderer> = new Map();

  get listView() {
    return this._listView;
  }

  get overview() {
    return this._overview;
  }

  get detailView() {
    return this._detailView;
  }

  constructor() {}

  getChartRenderers(context: ModuleChartContext) {
    return this._chartRenderers.get(context);
  }

  withListViewComponent(component: Type<unknown>) {
    this._listView = component;
    return this;
  }

  withOverviewComponent(component: Type<unknown>) {
    this._overview = component;
    return this;
  }

  withDetailViewComponent(component: Type<unknown>) {
    this._detailView = component;
    return this;
  }

  withChartRenderer(context: ModuleChartContext, renderer: ModuleChartRenderer) {
    this._chartRenderers.set(context, renderer);
    return this;
  }
}
