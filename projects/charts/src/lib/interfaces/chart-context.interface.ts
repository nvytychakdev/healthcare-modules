import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';

export interface ChartContext {
  root: Root;
  chart: XYChart;
}
