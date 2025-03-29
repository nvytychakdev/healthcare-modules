import { ModuleConfig } from '../interfaces/module-config.interface';
import { ModuleDataSource } from './module-data-source.model';
import { ModuleSettings } from './module-settings.model';
import { Module } from './module.model';

type ModuleCreationParams = {
  moduleSettings?: ModuleSettings;
  dataSource?: ModuleDataSource;
};

export class ModuleFactory {
  static createModule(moduleConfig: ModuleConfig, params?: ModuleCreationParams): Module {
    let module = new Module(moduleConfig);
    if (params?.moduleSettings) module = module.withModuleSettings(params.moduleSettings);
    if (params?.dataSource) module = module.withModuleDataSource(params.dataSource);
    return module;
  }
}
