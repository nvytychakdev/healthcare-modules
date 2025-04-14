import {
  createResolverProvider,
  Module,
  MODULE_UNITS,
  ModuleChartContext,
  ModuleConfig,
  ModuleFactory,
  ModuleLineChartRenderer,
  ModuleResolver,
  ModuleView,
} from '@healthcare/core';
import { WeightModuleSettings } from './weight.settings';

export const createWeightModule = (moduleConfig: ModuleConfig) => {
  const renderer = new ModuleLineChartRenderer()
    .withFields({
      valueYField: 'value',
      valueXField: 'createDateTime',
    })
    .withUnits(MODULE_UNITS.weight);

  const view = new ModuleView()
    .withChartRenderer(ModuleChartContext.Details, renderer)
    .withChartRenderer(ModuleChartContext.OverlayVitals, renderer);

  return ModuleFactory.createModule(moduleConfig, {
    moduleSettings: new WeightModuleSettings(),
    moduleUnits: MODULE_UNITS.weight,
    moduleView: view,
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
