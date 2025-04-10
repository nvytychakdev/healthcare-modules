import { ModuleConfig } from '../interfaces/module-config.interface';
import { ModuleDataSource } from './module-data-source.model';
import { ModuleSettings } from './module-settings.model';
import { ModuleUnit } from './module-unit.model';
import { ModuleView } from './module-view.model';
import { Module } from './module.model';

type ModuleCreationParams = {
  moduleSettings?: ModuleSettings;
  moduleDataSource?: ModuleDataSource;
  moduleView?: ModuleView;
  moduleUnits?: Map<string, ModuleUnit>;
};

export class ModuleFactory {
  static createModule(moduleConfig: ModuleConfig, params?: ModuleCreationParams): Module {
    let module = new Module(moduleConfig);
    if (params?.moduleView) module = module.withModuleView(params.moduleView);
    if (params?.moduleSettings) module = module.withModuleSettings(params.moduleSettings);
    if (params?.moduleDataSource) module = module.withModuleDataSource(params.moduleDataSource);
    if (params?.moduleUnits) module = module.withModuleUnits(params.moduleUnits);
    return module;
  }
}
