import { ModuleConfig, ModuleFactory } from '@healthcare/core';

export const createWeightModule = (moduleConfig: ModuleConfig) => {
  return ModuleFactory.createModule(moduleConfig, {});
};
