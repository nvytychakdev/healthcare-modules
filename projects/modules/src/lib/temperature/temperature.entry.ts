import {
  createResolverProvider,
  Module,
  ModuleChartContext,
  ModuleConfig,
  ModuleFactory,
  ModuleLineChartRenderer,
  ModuleResolver,
  ModuleView,
} from '@healthcare/core';
import { TemperatureListViewComponent } from './temperature-list-view/temperature-list-view.component';
import { TemperatureOverviewComponent } from './temperature-overview/temperature-overview.component';
import { TemperatureDataSource } from './temperature.data-source';
import { TemperatureSettings } from './temperature.settings';

export const createTemperatureModule = (moduleConfig: ModuleConfig) => {
  const settings = new TemperatureSettings();
  const dataSource = new TemperatureDataSource();
  const view = new ModuleView()
    .withListViewComponent(TemperatureListViewComponent)
    .withOverviewComponent(TemperatureOverviewComponent)
    .withChartRenderer(ModuleChartContext.Overview, new ModuleLineChartRenderer())
    .withChartRenderer(ModuleChartContext.Details, new ModuleLineChartRenderer());

  return ModuleFactory.createModule(moduleConfig, {
    moduleDataSource: dataSource,
    moduleSettings: settings,
    moduleView: view,
  });
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
