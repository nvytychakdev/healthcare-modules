import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { ChartXYStrategy } from '../../interfaces/chart-strategy.interface';

export class ChartDefaultStrategy implements ChartXYStrategy {
  create(root: Root): XYChart {
    return root.container.children.push(
      XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
      }),
    );
  }
}
