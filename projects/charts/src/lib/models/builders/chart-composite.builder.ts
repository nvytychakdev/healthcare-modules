import { ChartFeature } from '../../interfaces/chart-feature.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYSeriesStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { BaseChart } from '../base-chart.model';
import { LineChartComposite } from '../charts/line-chart-composite.model';

export class ChartCompositeBuilder {
  private chartStrategy?: ChartXYStrategy;
  private xAxisStrategy?: ChartXYDateAxisStrategy;
  private yAxisStrategies?: ChartXYValueAxisStrategy[];
  private scrollbarStrategy?: ChartXYScrollbarStrategy;
  private seriesStrategies?: ChartXYSeriesStrategy[];
  private readonly features: ChartFeature[] = [];

  constructor() {}

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

  withSeriesStrategy(strategies: ChartXYSeriesStrategy[]) {
    this.seriesStrategies = strategies;
    return this;
  }

  withScrollbarStrategy(strategy: ChartXYScrollbarStrategy) {
    this.scrollbarStrategy = strategy;
    return this;
  }

  build(element: string): BaseChart {
    return new LineChartComposite(
      element,
      this.chartStrategy,
      this.xAxisStrategy,
      this.yAxisStrategies,
      this.seriesStrategies,
      this.scrollbarStrategy,
      this.features,
    );
  }
}
