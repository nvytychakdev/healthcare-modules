import { v4 as uuidv4 } from 'uuid';
import { ModuleChartContext } from '../enums/module-chart-type.enum';
import { Module } from '../models/module.model';

export const createViewChart = (module: Module, context: ModuleChartContext) => {
  const renderer = module.view.getChartRenderers(context);
  return renderer?.createChart(uuidv4(), context);
};
