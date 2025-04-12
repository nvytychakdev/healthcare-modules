import { Chart, Root, Series } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';

export type ChartRenderYAxis = {
  axis: ValueAxis<AxisRenderer>;
  series: Series[];
};

export interface ChartRender {
  root: Root;
  chart: Chart;
  yAxes: ChartRenderYAxis[];
}
