import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { Module, ModuleFactory, ModuleRegistryService } from '@healthcare/core';
import { MODULES_MOCK } from '../../../projects/core/src/lib/mock/module.mock';
import { MODULES_RESOLVER_MAP } from '../models/module-resolver-map.model';

export const moduleConfigResolver: ResolveFn<Module[]> = (route, state) => {
  const registry = inject(ModuleRegistryService);
  const modules = MODULES_MOCK.map((config) => {
    const creatorFn = MODULES_RESOLVER_MAP[config.moduleId];
    if (!creatorFn) return ModuleFactory.createModule(config);
    return creatorFn(config);
  });

  modules.forEach((module) => registry.registerModule(module));
  return modules;
};
