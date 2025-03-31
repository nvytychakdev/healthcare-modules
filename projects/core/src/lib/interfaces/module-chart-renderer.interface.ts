import { ModuleChartContext } from '../enums/module-chart-type.enum';

export interface ModuleChartRenderer {
  createChart(root: HTMLElement, context: ModuleChartContext): void;
}
