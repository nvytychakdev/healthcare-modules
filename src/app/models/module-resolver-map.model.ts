import { Module, ModuleConfig } from '@healthcare/core';
import { createTemperatureModule, createWeightModule } from '@healthcare/modules';

export const MODULES_RESOLVER_MAP: Record<string, (moduleConfig: ModuleConfig) => Module> = {
  ['Temperature']: createTemperatureModule,
  ['Weight']: createWeightModule,
};
