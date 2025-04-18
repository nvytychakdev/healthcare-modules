import { v4 as uuidv4 } from 'uuid';
import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { Module } from '../models/module.model';

export const createViewChart = (
  module: Module,
  context: ModuleChartContext,
  preferredUnit?: string,
) => {
  const renderer = module.view.getChartRenderer(context);
  return renderer?.withPreferredUnits(preferredUnit).createChart(uuidv4(), context);
};

export const createCompositeViewChart = (
  module: Module,
  compositeModule: Module,
  preferredUnit?: string,
  compositePreferredUnit?: string,
) => {
  const renderer = module.view
    .getChartRenderer(ModuleChartContext.OverlayVitals)
    ?.withPreferredUnits(preferredUnit);
  const compositeRenderer = compositeModule.view.getChartRenderer(ModuleChartContext.OverlayVitals);

  const compositeStrategy = compositeRenderer?.getCompositeStrategy(compositePreferredUnit);
  if (!compositeStrategy) {
    throw new Error('Invalid composite chart configuration, missing strategies');
  }

  return renderer?.createCompositeChart(uuidv4(), compositeStrategy);
};
