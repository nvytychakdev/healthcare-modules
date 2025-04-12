import { v4 as uuidv4 } from 'uuid';
import { ModuleChartContext } from '../enums/module-chart-type.enum';
import { Module } from '../models/module.model';

export const createViewChart = (module: Module, context: ModuleChartContext) => {
  const renderer = module.view.getChartRenderers(context);
  return renderer?.createChart(uuidv4(), context);
};

export const createCompositeViewChart = (module: Module, compositeModule: Module) => {
  const renderer = module.view.getChartRenderers(ModuleChartContext.OverlayVitals);
  const compositeRenderer = compositeModule.view.getChartRenderers(
    ModuleChartContext.OverlayVitals,
  );

  const compositeStrategy = compositeRenderer?.getCompositeStrategy();
  if (!compositeStrategy) {
    throw new Error('Invalid composite chart configuration, missing strategies');
  }

  return renderer?.createCompositeChart(uuidv4(), compositeStrategy);
};
