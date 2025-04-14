import { Root } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { AxisRendererY } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererY';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { XYSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import {
  ChartXYSeriesStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';

export class AxisValueDefaultStrategy implements ChartXYValueAxisStrategy {
  constructor(private seriesStrategies: ChartXYSeriesStrategy[]) {}

  create(root: Root, chart: XYChart): ValueAxis<AxisRenderer> {
    const syncWithAxis =
      chart.yAxes.length > 0 ? (chart.yAxes.getIndex(0) as ValueAxis<AxisRenderer>) : undefined;
    return chart.yAxes.push(
      ValueAxis.new(root, {
        renderer: AxisRendererY.new(root, {}),
        extraMax: 0.1,
        extraMin: 0.1,
        autoZoom: false,
        syncWithAxis,
      }),
    );
  }

  createSeries(
    root: Root,
    chart: XYChart,
    xAxis: DateAxis<AxisRenderer>,
    yAxis: ValueAxis<AxisRenderer>,
  ): XYSeries[] {
    return this.seriesStrategies.map((strategy) => strategy.create(root, chart, xAxis, yAxis));
  }

  bindData(data: unknown[]): void {
    return this.seriesStrategies.forEach((strategy) => strategy.bindData(data || []));
  }
}
