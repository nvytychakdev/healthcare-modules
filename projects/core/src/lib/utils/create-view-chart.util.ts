import { v4 as uuidv4 } from 'uuid';
import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { ModuleValueContext } from '../enums/module-value-context.enum';
import { Module } from '../models/module.model';

export const createViewChart = (
  module: Module,
  context: ModuleChartContext,
  preferredUnit?: string,
) => {
  const renderer = module.view.getChartRenderer(context);
  const unit = module.valueResolver.resolveUnit(ModuleValueContext.Details, preferredUnit);
  return renderer?.withModule(module).withPreferredUnits(unit).createChart(uuidv4(), context);
};

export const createCompositeViewChart = (
  module: Module,
  compositeModule: Module,
  preferredUnit?: string,
  compositePreferredUnit?: string,
) => {
  // original chart
  const unit = module.valueResolver.resolveUnit(ModuleValueContext.Details, preferredUnit);
  const renderer = module.view
    .getChartRenderer(ModuleChartContext.OverlayVitals)
    ?.withModule(module)
    ?.withPreferredUnits(unit);

  // composite chart
  const compositeRenderer = compositeModule.view.getChartRenderer(ModuleChartContext.OverlayVitals);
  const compositeUnit = compositeModule.valueResolver.resolveUnit(
    ModuleValueContext.Details,
    compositePreferredUnit,
  );
  const compositeStrategy = compositeRenderer
    ?.withModule(compositeModule)
    .getCompositeStrategy(compositeUnit);

  if (!compositeStrategy) {
    throw new Error('Invalid composite chart configuration, missing strategies');
  }

  return renderer?.createCompositeChart(uuidv4(), compositeStrategy);
};
