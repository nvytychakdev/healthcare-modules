import { Root } from '@amcharts/amcharts5';
import { ChartRenderFields } from '../interfaces/chart-render-fields.interface';
import { ChartRender } from '../interfaces/chart-render.interface';

export const CHART_RENDER_FIELDS_DEFAULT: ChartRenderFields = {
  valueYField: 'value',
  valueXField: 'createDateTime',
};

export abstract class BaseChart {
  constructor(
    public elementId: string,
    protected fields: ChartRenderFields = CHART_RENDER_FIELDS_DEFAULT,
  ) {}

  protected createRoot(): Root {
    return Root.new(this.elementId);
  }

  abstract render(): ChartRender;
}
