import { color, Root, Theme } from '@amcharts/amcharts5';
import AnimatedTheme from '@amcharts/amcharts5/themes/Animated';
import DarkTheme from '@amcharts/amcharts5/themes/Dark';
import { ChartRenderFields } from '../interfaces/chart-render-fields.interface';
import { ChartRender } from '../interfaces/chart-render.interface';

export const CHART_RENDER_FIELDS_DEFAULT: ChartRenderFields = {
  valueYField: 'value',
  valueXField: 'createDateTime',
};

export abstract class BaseChart {
  private readonly themeColors = ['#82c535', '#087f8c', '#00ceb0'];

  constructor(public elementId: string) {}

  protected createRoot(): Root {
    return Root.new(this.elementId);
  }

  protected applyThemes(root: Root): void {
    const theme = Theme.new(root);
    theme.rule('ColorSet').set('colors', this.themeColors.map(color));

    root.setThemes([AnimatedTheme.new(root), DarkTheme.new(root), theme]);
  }

  abstract render(): ChartRender;
  abstract bindData(...data: unknown[][]): void;
}
