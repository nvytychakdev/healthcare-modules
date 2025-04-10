import { color, Root, Theme } from '@amcharts/amcharts5';
import AnimatedTheme from '@amcharts/amcharts5/themes/Animated';
import DarkTheme from '@amcharts/amcharts5/themes/Dark';
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

export class LineChart extends BaseChart {
  private readonly themeColors = ['#82c535', '#087f8c', '#00ceb0'];

  constructor(
    element: string,
    private chartStrategy: ChartXYStrategy = new ChartDefaultStrategy(),
    private xAxisStrategy: ChartXYDateAxisStrategy = new AxisDateDefaultStrategy(),
    private yAxisStrategy: ChartXYValueAxisStrategy = new AxisValueDefaultStrategy(),
    private seriesStrategy: ChartXYSeriesStrategy = new SeriesLineDefaultStrategy(),
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
    const yAxis = this.yAxisStrategy.create(root, chart);
    const series = this.seriesStrategy.create(root, chart, xAxis, yAxis);
    const scrollbarSeries = this.scrollbarStrategy?.create(root, chart, series);

    // apply list of features passed into the chart
    // use these to extend your chart functionality
    this.features?.forEach((feature) => feature.apply({ root, chart, series }));

    series.appear(1000);
    chart.appear(1000, 100);

    return { root, series, scrollbarSeries, chart };
  }

  private applyThemes(root: Root): void {
    const theme = Theme.new(root);
    theme.rule('ColorSet').set('colors', this.themeColors.map(color));

    root.setThemes([AnimatedTheme.new(root), DarkTheme.new(root), theme]);
  }
}
