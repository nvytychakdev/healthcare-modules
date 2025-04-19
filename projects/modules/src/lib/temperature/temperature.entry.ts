import {
  createResolverProvider,
  Module,
  MODULE_UNITS,
  ModuleBuilder,
  ModuleChartContext,
  ModuleConfig,
  ModuleLineChartRenderer,
  ModuleResolver,
} from '@healthcare/core';
import { PREFERRED_UNIT_DATA_TRANSFORMER_FN } from '../../../../core/src/lib/models/module-data-transformers/module-data-transformers-default.model';
import { TemperatureListViewComponent } from './temperature-list-view/temperature-list-view.component';
import { TemperatureOverviewComponent } from './temperature-overview/temperature-overview.component';
import { TemperatureDataSource } from './temperature.data-source';
import { TemperatureSettings } from './temperature.settings';

export const createTemperatureModule = (moduleConfig: ModuleConfig) => {
  const settings = new TemperatureSettings();
  const dataSource = new TemperatureDataSource().withDataTransformer(
    PREFERRED_UNIT_DATA_TRANSFORMER_FN,
  );
  const renderer = new ModuleLineChartRenderer().withFields({
    valueYField: 'value',
    valueXField: 'createDateTime',
  });

  return new ModuleBuilder()
    .withSettings(settings)
    .withDataSource(dataSource)
    .withUnits(MODULE_UNITS.temperature)
    .withChartRenderer(ModuleChartContext.Overview, renderer)
    .withChartRenderer(ModuleChartContext.Details, renderer)
    .withChartRenderer(ModuleChartContext.OverlayVitals, renderer)
    .withViewComponents({
      list: TemperatureListViewComponent,
      overview: TemperatureOverviewComponent,
    })
    .build(moduleConfig);
};

class TemperatureModuleResolver implements ModuleResolver {
  canResolve(config: ModuleConfig): boolean {
    return config.moduleId === 'Temperature';
  }

  resolve(moduleConfig: ModuleConfig): Module {
    return createTemperatureModule(moduleConfig);
  }
}

export const provideTemperatureModule = () => createResolverProvider(TemperatureModuleResolver);
