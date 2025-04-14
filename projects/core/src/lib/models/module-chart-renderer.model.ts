import {
  BaseChart,
  CHART_RENDER_FIELDS_DEFAULT,
  ChartRenderFields,
  ChartXYValueAxisStrategy,
} from '@healthcare/charts';
import { ModuleChartContext } from '../enums/module-chart-type.enum';
import { ModuleUnit } from './module-unit.model';

export abstract class ModuleChartRenderer {
  protected fields: ChartRenderFields = CHART_RENDER_FIELDS_DEFAULT;
  protected units?: Map<string, ModuleUnit>;

  protected yAxesStrategy?: ChartXYValueAxisStrategy;

  abstract createChart(root: string, context: ModuleChartContext): BaseChart;
  abstract createCompositeChart(
    root: string,
    compositeStrategy: ChartXYValueAxisStrategy,
  ): BaseChart;

  withUnits(units: Map<string, ModuleUnit>) {
    this.units = units;
    return this;
  }

  withFields(fields: Partial<ChartRenderFields>) {
    this.fields = { ...CHART_RENDER_FIELDS_DEFAULT, ...fields };
    return this;
  }

  withCompositeStrategy(yAxesStrategy?: ChartXYValueAxisStrategy) {
    this.yAxesStrategy = yAxesStrategy;
    return this;
  }

  getCompositeStrategy(): ChartXYValueAxisStrategy | undefined {
    return this.yAxesStrategy;
  }
}
