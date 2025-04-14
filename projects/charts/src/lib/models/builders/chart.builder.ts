import { ChartFactory } from '../../interfaces/chart-factory.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYSeriesTooltipStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { BaseChart } from '../base-chart.model';
import { LineChart } from '../charts/line-chart.model';

export class ChartBuilder {
  private chartStrategy?: ChartXYStrategy;
  private xAxisStrategy?: ChartXYDateAxisStrategy;
  private yAxisStrategies?: ChartXYValueAxisStrategy[];
  private readonly features: ChartFeature[] = [];

  constructor(
    factory?: ChartFactory,
    fields?: ChartRenderFields,
    tooltip?: ChartXYSeriesTooltipStrategy,
  ) {
    if (!factory) return;

    this.chartStrategy = factory?.createChart();
    this.xAxisStrategy = factory?.createDateAxis();
    this.yAxisStrategies = factory?.createValueAxes(fields, tooltip);

    const scrollbar = factory?.createScrollbar();
    if (scrollbar) this.features.push(scrollbar);

    const cursor = factory?.createCursor();
    if (cursor) this.features.push(cursor);
  }

  withFeature(feature: ChartFeature) {
    this.features.push(feature);
    return this;
  }

  withChartStrategy(strategy: ChartXYStrategy) {
    this.chartStrategy = strategy;
    return this;
  }

  withValueAxisStrategies(strategies: ChartXYValueAxisStrategy[]) {
    this.yAxisStrategies = strategies;
    return this;
  }

  withDateAxisStrategy(strategy: ChartXYDateAxisStrategy) {
    this.xAxisStrategy = strategy;
    return this;
  }

  build(element: string): BaseChart {
    return new LineChart(
      element,
      this.chartStrategy,
      this.xAxisStrategy,
      this.yAxisStrategies,
      this.features,
    );
  }
}
