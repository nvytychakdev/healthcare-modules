import { Type } from '@angular/core';
import {
  ModuleDetailsComponent,
  ModuleListViewComponent,
  ModuleOverviewCardComponent,
} from '../../public-api';

export class ModuleView {
  private _listView: Type<unknown> = ModuleListViewComponent;
  private _overview: Type<unknown> = ModuleOverviewCardComponent;
  private _detailView: Type<unknown> = ModuleDetailsComponent;

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
}
