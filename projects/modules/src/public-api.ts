/*
 * Public API Surface of modules
 */

import { makeEnvironmentProviders } from '@angular/core';
import { provideTemperatureModule } from './lib/temperature/temperature.entry';
import { provideWeightModule } from './lib/weight/weight.entry';

export const provideModules = () =>
  makeEnvironmentProviders([provideTemperatureModule(), provideWeightModule()]);
