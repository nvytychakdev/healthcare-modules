import { Root } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { XYSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';

export interface ChartStrategy {
  create(root: Root, chart?: XYChart, series?: XYSeries): void;
}

export interface ChartXYStrategy extends ChartStrategy {
  create(root: Root): XYChart;
}

export interface ChartXYDateAxisStrategy extends ChartStrategy {
  create(root: Root, chart: XYChart): DateAxis<AxisRenderer>;
}

export interface ChartXYValueAxisStrategy extends ChartStrategy {
  create(root: Root, chart: XYChart): ValueAxis<AxisRenderer>;
}

export interface ChartXYSeriesStrategy {
  create(
    root: Root,
    chart: XYChart,
    xAxis: DateAxis<AxisRenderer>,
    yAxis: ValueAxis<AxisRenderer>,
  ): XYSeries;
  bindData(data: unknown[]): void;
}

export interface ChartXYScrollbarStrategy extends ChartStrategy {
  create(root: Root, chart: XYChart, series: XYSeries): XYSeries | undefined;
  bindData?(data: unknown[]): void;
}
