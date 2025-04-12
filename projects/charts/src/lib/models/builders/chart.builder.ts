import { ChartFactory } from '../../interfaces/chart-factory.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { BaseChart } from '../base-chart.model';
import { LineChart } from '../charts/line-chart.model';

export class ChartBuilder {
  private chartStrategy?: ChartXYStrategy;
  private xAxisStrategy?: ChartXYDateAxisStrategy;
  private yAxisStrategies?: ChartXYValueAxisStrategy[];
  private scrollbarStrategy?: ChartXYScrollbarStrategy;
  private readonly features: ChartFeature[] = [];

  constructor(factory?: ChartFactory, fields?: ChartRenderFields) {
    if (!factory) return;

    this.chartStrategy = factory?.createChart();
    this.xAxisStrategy = factory?.createDateAxis();
    this.yAxisStrategies = factory?.createValueAxes(fields);
    this.scrollbarStrategy = factory?.createScrollbar();

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

  withScrollbarStrategy(strategy: ChartXYScrollbarStrategy) {
    this.scrollbarStrategy = strategy;
    return this;
  }

  build(element: string): BaseChart {
    return new LineChart(
      element,
      this.chartStrategy,
      this.xAxisStrategy,
      this.yAxisStrategies,
      this.scrollbarStrategy,
      this.features,
    );
  }
}
