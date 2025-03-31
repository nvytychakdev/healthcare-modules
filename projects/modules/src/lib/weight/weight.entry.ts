import {
  createResolverProvider,
  Module,
  ModuleConfig,
  ModuleFactory,
  ModuleResolver,
} from '@healthcare/core';
import { WeightModuleSettings } from './weight.settings';

export const createWeightModule = (moduleConfig: ModuleConfig) => {
  return ModuleFactory.createModule(moduleConfig, {
    moduleSettings: new WeightModuleSettings(),
  });
};

class WeightModuleResolver implements ModuleResolver {
  canResolve(config: ModuleConfig): boolean {
    return config.moduleId === 'Weight';
  }

  resolve(moduleConfig: ModuleConfig): Module {
    return createWeightModule(moduleConfig);
  }
}

export const provideWeightModule = () => createResolverProvider(WeightModuleResolver);
