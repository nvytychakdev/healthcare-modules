import { CHART_RENDER_FIELDS_DEFAULT, ChartRenderFields } from '@healthcare/charts';
import { ModuleChartContext } from '../enums/module-chart-type.enum';

export abstract class ModuleChartRenderer {
  protected fields: ChartRenderFields = CHART_RENDER_FIELDS_DEFAULT;
  abstract createChart(root: string, context: ModuleChartContext): void;

  withFields(fields: Partial<ChartRenderFields>) {
    this.fields = { ...CHART_RENDER_FIELDS_DEFAULT, ...fields };
    return this;
  }
}
