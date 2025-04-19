import { v4 as uuidv4 } from 'uuid';
import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { ModuleUnit } from '../models/module-unit.model';
import { Module } from '../models/module.model';

export const createViewChart = (
  module: Module,
  context: ModuleChartContext,
  preferredUnit?: ModuleUnit,
) => {
  const renderer = module.view.getChartRenderer(context);
  return renderer
    ?.withModule(module)
    .withPreferredUnits(preferredUnit)
    .createChart(uuidv4(), context);
};

export const createCompositeViewChart = (
  module: Module,
  compositeModule: Module,
  preferredUnit?: ModuleUnit,
  compositePreferredUnit?: ModuleUnit,
) => {
  // original chart
  const renderer = module.view
    .getChartRenderer(ModuleChartContext.OverlayVitals)
    ?.withModule(module)
    ?.withPreferredUnits(preferredUnit);

  // composite chart
  const compositeRenderer = compositeModule.view.getChartRenderer(ModuleChartContext.OverlayVitals);
  const compositeStrategy = compositeRenderer
    ?.withModule(compositeModule)
    .getCompositeStrategy(compositePreferredUnit);

  if (!compositeStrategy) {
    throw new Error('Invalid composite chart configuration, missing strategies');
  }

  return renderer?.createCompositeChart(uuidv4(), compositeStrategy);
};
