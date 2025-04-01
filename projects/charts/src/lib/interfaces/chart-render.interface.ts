import { Chart, Root, Series } from '@amcharts/amcharts5';

export interface ChartRender {
  chart: Chart;
  series: Series;
  root: Root;
}
