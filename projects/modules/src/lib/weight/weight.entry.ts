import {
  createResolverProvider,
  Module,
  MODULE_UNITS,
  ModuleChartContext,
  ModuleConfig,
  ModuleLineChartRenderer,
  ModuleResolver,
  ModuleView,
} from '@healthcare/core';
import { ModuleBuilder } from '../../../../core/src/lib/models/module-builder.model';
import { WeightModuleSettings } from './weight.settings';

export const createWeightModule = (moduleConfig: ModuleConfig) => {
  const renderer = new ModuleLineChartRenderer().withFields({
    valueYField: 'value',
    valueXField: 'createDateTime',
  });

  const view = new ModuleView()
    .withChartRenderer(ModuleChartContext.Overview, renderer)
    .withChartRenderer(ModuleChartContext.Details, renderer)
    .withChartRenderer(ModuleChartContext.OverlayVitals, renderer);

  return new ModuleBuilder()
    .withSettings(new WeightModuleSettings())
    .withUnits(MODULE_UNITS.weight)
    .withView(view)
    .build(moduleConfig);
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
