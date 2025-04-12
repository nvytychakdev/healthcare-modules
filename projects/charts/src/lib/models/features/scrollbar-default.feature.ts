import { XYChartScrollbar } from '@amcharts/amcharts5/.internal/charts/xy/XYChartScrollbar';
import { ChartContext } from '../../interfaces/chart-context.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';

export class ScrollbarDefaultStrategy implements ChartFeature {
  apply(context: ChartContext): void {
    const { root, chart } = context;
    chart.set(
      'scrollbarX',
      XYChartScrollbar.new(root, {
        orientation: 'horizontal',
        height: 60,
      }),
    );
  }
}
