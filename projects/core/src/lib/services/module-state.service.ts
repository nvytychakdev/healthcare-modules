import { Injectable, signal } from '@angular/core';
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root',
})
export class ModuleStateService {
  private readonly _selectedModule = signal<Module | undefined>(undefined);
  readonly selectedModule = this._selectedModule.asReadonly();

  selectModule(module: Module) {
    this._selectedModule.set(module);
  }
}
