import { Chart, Root, Series } from '@amcharts/amcharts5';

export interface ChartRender {
  root: Root;
  chart: Chart;
  instances: Array<{
    series: Series;
    scrollbarSeries?: Series;
  }>;
}
