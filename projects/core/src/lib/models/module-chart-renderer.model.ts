import {
  BaseChart,
  CHART_RENDER_FIELDS_DEFAULT,
  ChartRenderFields,
  ChartXYSeriesStrategy,
  ChartXYValueAxisStrategy,
} from '@healthcare/charts';
import { ModuleChartContext } from '../enums/module-chart-type.enum';

export abstract class ModuleChartRenderer {
  protected fields: ChartRenderFields = CHART_RENDER_FIELDS_DEFAULT;

  protected yAxesStrategy?: ChartXYValueAxisStrategy;
  protected seriesStrategy?: ChartXYSeriesStrategy;

  abstract createChart(root: string, context: ModuleChartContext): BaseChart;
  abstract createCompositeChart(
    root: string,
    compareYAxesStrategy: ChartXYValueAxisStrategy,
    compareSeriesStrategy: ChartXYSeriesStrategy,
  ): BaseChart;

  withFields(fields: Partial<ChartRenderFields>) {
    this.fields = { ...CHART_RENDER_FIELDS_DEFAULT, ...fields };
    return this;
  }

  withCompositeStrategies(
    yAxesStrategy?: ChartXYValueAxisStrategy,
    seriesStrategy?: ChartXYSeriesStrategy,
  ) {
    this.yAxesStrategy = yAxesStrategy;
    this.seriesStrategy = seriesStrategy;
    return this;
  }

  getCompositeStrategies() {
    return {
      yAxisStrategy: this.yAxesStrategy,
      seriesStrategy: this.seriesStrategy,
    };
  }
}
