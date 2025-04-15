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
    return new Module(moduleConfig)
      .withModuleView(params?.moduleView)
      .withModuleSettings(params?.moduleSettings)
      .withModuleDataSource(params?.moduleDataSource)
      .withModuleUnits(params?.moduleUnits);
  }
}
