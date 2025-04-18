import { Type } from '@angular/core';
import {
  ModuleDetailsComponent,
  ModuleListViewComponent,
  ModuleOverviewCardComponent,
} from '../../public-api';
import { ModuleCardComponent } from '../components/module-core/module-card/module-card.component';
import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { ModuleChartRenderer } from './module-chart-renderer.model';

export class ModuleView {
  private _listView: Type<unknown> = ModuleListViewComponent;
  private _overview: Type<unknown> = ModuleOverviewCardComponent;
  private _detailView: Type<unknown> = ModuleDetailsComponent;
  private _cardView: Type<unknown> = ModuleCardComponent;
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

  get cardView() {
    return this._cardView;
  }

  constructor() {}

  getChartRenderer(context: ModuleChartContext) {
    return this._chartRenderers.get(context);
  }

  getAllChartRenderers() {
    return Array.from(this._chartRenderers.values());
  }

  withListViewComponent(component?: Type<unknown>) {
    if (component) this._listView = component;
    return this;
  }

  withOverviewComponent(component?: Type<unknown>) {
    if (component) this._overview = component;
    return this;
  }

  withDetailViewComponent(component?: Type<unknown>) {
    if (component) this._detailView = component;
    return this;
  }

  withCardViewComponent(component?: Type<unknown>) {
    if (component) this._cardView = component;
    return this;
  }

  withChartRenderer(context: ModuleChartContext, renderer: ModuleChartRenderer) {
    this._chartRenderers.set(context, renderer);
    return this;
  }
}
