import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { XYChartScrollbar } from '@amcharts/amcharts5/.internal/charts/xy/XYChartScrollbar';
import { ChartXYScrollbarStrategy } from '../../interfaces/chart-strategy.interface';

export class ScrollbarDefaultStrategy implements ChartXYScrollbarStrategy {
  create(root: Root, chart: XYChart): void {
    chart.set(
      'scrollbarX',
      XYChartScrollbar.new(root, {
        orientation: 'horizontal',
        height: 60,
      }),
    );
  }
}
