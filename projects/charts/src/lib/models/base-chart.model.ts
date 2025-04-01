import { Root } from '@amcharts/amcharts5';
import { ChartRender } from '../interfaces/chart-render.interface';

export abstract class BaseChart {
  constructor(public elementId: string) {}

  protected createRoot(): Root {
    return Root.new(this.elementId);
  }

  abstract render(): ChartRender;
}
