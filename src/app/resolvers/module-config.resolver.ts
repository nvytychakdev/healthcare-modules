import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { Module, MODULE_RESOLVER, ModuleFactory, ModuleRegistryService } from '@healthcare/core';
import { MODULES_MOCK } from '../../../projects/core/src/lib/mock/module.mock';

export const moduleConfigResolver: ResolveFn<Module[]> = (route, state) => {
  const registry = inject(ModuleRegistryService);
  const resolvers = inject(MODULE_RESOLVER);
  const modules = MODULES_MOCK.map((config) => {
    const resolver = resolvers.find((resolver) => resolver.canResolve(config));
    if (!resolver) return ModuleFactory.createModule(config);
    return resolver.resolve(config);
  });

  registry.clearModules();
  modules.forEach((module) => registry.registerModule(module));
  return modules;
};
