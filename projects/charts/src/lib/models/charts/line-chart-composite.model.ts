import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { XYSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRender } from '../../interfaces/chart-render.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYSeriesStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { BaseChart } from '../base-chart.model';
import { AxisDateDefaultStrategy } from '../strategies/axis-date-default.strategy';
import { AxisValueDefaultStrategy } from '../strategies/axis-value-default.strategy';
import { ChartDefaultStrategy } from '../strategies/chart-default.strategy';
import { SeriesLineDefaultStrategy } from '../strategies/series-line-default.strategy';

export class LineChartComposite extends BaseChart {
  constructor(
    element: string,
    private chartStrategy: ChartXYStrategy = new ChartDefaultStrategy(),
    private xAxisStrategy: ChartXYDateAxisStrategy = new AxisDateDefaultStrategy(),
    private yAxisStrategies: ChartXYValueAxisStrategy[] = [new AxisValueDefaultStrategy()],
    private seriesStrategies: ChartXYSeriesStrategy[] = [new SeriesLineDefaultStrategy()],
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

    const yAxisInstances = this.createValueAxis(root, chart, xAxis);
    // apply list of features passed into the chart
    // use these to extend your chart functionality
    this.features?.forEach((feature) => feature.apply({ root, chart }));

    yAxisInstances.forEach(({ series }) => series.appear(1000));

    chart.appear(1000, 100);

    return { root, chart, instances: yAxisInstances };
  }

  override bindData(...data: unknown[][]) {
    this.seriesStrategies.forEach((strategy, index) => {
      strategy.bindData(data.at(index) || []);
    });
  }

  private createValueAxis(
    root: Root,
    chart: XYChart,
    xAxis: DateAxis<AxisRenderer>,
  ): Array<{ series: XYSeries; scrollbarSeries?: XYSeries }> {
    return this.yAxisStrategies.map((strategy, index) => {
      const yAxis = strategy.create(root, chart);

      const seriesStrategy = this.seriesStrategies.at(index);
      if (!seriesStrategy) throw new Error('Chart is missconfigured. No series by index provided');

      const series = seriesStrategy.create(root, chart, xAxis, yAxis);
      const scrollbarSeries = this.scrollbarStrategy?.create(root, chart, series);
      return { series, scrollbarSeries };
    });
  }
}
