import { Injectable, signal } from '@angular/core';
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root',
})
export class ModuleStateService {
  private readonly _selectedModule = signal<Module | undefined>(undefined);
  readonly selectedModule = this._selectedModule.asReadonly();

  private readonly _units: Map<string, string> = new Map()
    .set('Temperature', 'celsius')
    .set('Weight', 'kg');

  get preferredUnits(): ReadonlyMap<string, string> {
    return this._units;
  }

  selectModule(module: Module) {
    this._selectedModule.set(module);
  }

  setPreferredUnits(moduleId: string, preferredUnit: string) {
    this._units?.set(moduleId, preferredUnit);
  }
}
