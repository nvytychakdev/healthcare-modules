import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { MODULES } from '../../projects/core/src/lib/mock/module.mock';
import { ModuleFactory } from '../../projects/core/src/lib/models/module-factory.model';
import { ModuleRegistryService } from '../../projects/core/src/lib/services/module-registry.service';
import { routes } from './app.routes';

const provideAllModules = () => {
  const moduleConfigs = MODULES;
  const modules = moduleConfigs.map((config) => ModuleFactory.createModule(config));
  modules.forEach((module) => inject(ModuleRegistryService).registerModule(module));
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppInitializer(() => provideAllModules()),
  ],
};
