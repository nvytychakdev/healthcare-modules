import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRender, ChartRenderYAxis } from '../../interfaces/chart-render.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { BaseChart } from '../base-chart.model';
import { AxisDateDefaultStrategy } from '../strategies/axis-date-default.strategy';
import { AxisValueDefaultStrategy } from '../strategies/axis-value-default.strategy';
import { ChartDefaultStrategy } from '../strategies/chart-default.strategy';
import { SeriesLineDefaultStrategy } from '../strategies/series-line-default.strategy';

export class LineChart extends BaseChart {
  constructor(
    element: string,
    private chartStrategy: ChartXYStrategy = new ChartDefaultStrategy(),
    private xAxisStrategy: ChartXYDateAxisStrategy = new AxisDateDefaultStrategy(),
    private yAxisStrategies: ChartXYValueAxisStrategy[] = [
      new AxisValueDefaultStrategy([new SeriesLineDefaultStrategy()]),
    ],
    private scrollbarStrategy?: ChartXYScrollbarStrategy,
    private features?: ChartFeature[],
  ) {
    super(element);
  }

  override render(): ChartRender {
    const root = this.createRoot();
    this.applyThemes(root);

    // apply list of expected strategies
    // use these to override your chart functionality
    const chart = this.chartStrategy.create(root);
    const xAxis = this.xAxisStrategy.create(root, chart);

    const yAxesWithSeries = this.createValueAxis(root, chart, xAxis);
    this.scrollbarStrategy?.create(root, chart);
    // apply list of features passed into the chart
    // use these to extend your chart functionality
    this.features?.forEach((feature) => feature.apply({ root, chart }));

    // appear chart elements on the screen
    yAxesWithSeries.forEach(({ series }) => series.forEach((s) => s.appear(1000)));
    chart.appear(1000, 100);

    return { root, chart, yAxes: yAxesWithSeries };
  }

  override bindData(...data: unknown[][]) {
    this.yAxisStrategies.forEach((strategy, index) => {
      strategy.bindData(data.at(index) || []);
    });
  }

  private createValueAxis(
    root: Root,
    chart: XYChart,
    xAxis: DateAxis<AxisRenderer>,
  ): ChartRenderYAxis[] {
    return this.yAxisStrategies.map((strategy) => {
      const yAxis = strategy.create(root, chart);
      const series = strategy.createSeries(root, chart, xAxis, yAxis);
      return { axis: yAxis, series };
    });
  }
}
