import { Root } from '@amcharts/amcharts5';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { ChartXYStrategy } from '../../interfaces/chart-strategy.interface';

export class ChartMinimalStrategy implements ChartXYStrategy {
  create(root: Root): XYChart {
    return root.container.children.push(
      XYChart.new(root, {
        paddingBottom: 16,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 16,
      }),
    );
  }
}
