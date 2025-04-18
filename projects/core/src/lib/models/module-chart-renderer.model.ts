import {
  BaseChart,
  CHART_RENDER_FIELDS_DEFAULT,
  ChartRenderFields,
  ChartXYValueAxisStrategy,
} from '@healthcare/charts';
import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { ModuleUnit } from './module-unit.model';
import { Module } from './module.model';

export abstract class ModuleChartRenderer {
  protected moduleRef?: Module;
  protected fields: ChartRenderFields = CHART_RENDER_FIELDS_DEFAULT;
  protected preferredUnit?: ModuleUnit;

  protected yAxesStrategy?: ChartXYValueAxisStrategy;

  abstract createChart(root: string, context: ModuleChartContext): BaseChart;
  abstract createCompositeChart(
    root: string,
    compositeStrategy: ChartXYValueAxisStrategy,
  ): BaseChart;

  withModule(module: Module) {
    this.moduleRef = module;
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

  getCompositeStrategy(preferredUnit?: ModuleUnit): ChartXYValueAxisStrategy | undefined {
    return this.yAxesStrategy;
  }

  withPreferredUnits(unit?: ModuleUnit) {
    this.preferredUnit = unit;
    return this;
  }
}
