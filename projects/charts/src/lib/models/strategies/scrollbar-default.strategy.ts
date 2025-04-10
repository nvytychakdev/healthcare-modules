import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { XYChartScrollbar } from '@amcharts/amcharts5/.internal/charts/xy/XYChartScrollbar';
import { AxisRendererX } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererX';
import { AxisRendererY } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererY';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { LineSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/LineSeries';
import { XYSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';
import { ChartXYScrollbarStrategy } from '../../interfaces/chart-strategy.interface';

export class ScrollbarDefaultStrategy implements ChartXYScrollbarStrategy {
  create(root: Root, chart: XYChart, series: XYSeries): XYSeries {
    const scrollbar = chart.set(
      'scrollbarX',
      XYChartScrollbar.new(root, {
        orientation: 'horizontal',
        height: 60,
      }),
    );

    const scrollbarDateAxis = scrollbar.chart.xAxes.push(
      DateAxis.new(root, {
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70,
        }),
      }),
    );

    const scrollbarValueAxis = scrollbar.chart.yAxes.push(
      ValueAxis.new(root, {
        renderer: AxisRendererY.new(root, {}),
      }),
    );

    const scrollbarSeries = scrollbar.chart.series.push(
      LineSeries.new(root, {
        valueYField: series.get('valueYField'),
        valueXField: series.get('valueXField'),
        xAxis: scrollbarDateAxis,
        yAxis: scrollbarValueAxis,
      }),
    );

    return scrollbarSeries;
  }
}
