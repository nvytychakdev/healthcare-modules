import { computed, Injectable, signal } from '@angular/core';
import { Module } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class ModuleRegistryService {
  private readonly _modules = signal<Module[]>([]);
  readonly modules = this._modules.asReadonly();

  readonly enabledModules = computed(() => {
    return this.modules().filter((module) => module.isEnabled());
  });

  registerModule(module: Module) {
    this._modules.update((modules) => [...modules, module]);
  }
}
