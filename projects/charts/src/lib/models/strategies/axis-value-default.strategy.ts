import { Root } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { AxisRendererY } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererY';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { ChartXYValueAxisStrategy } from '../../interfaces/chart-strategy.interface';

export class AxisValueDefaultStrategy implements ChartXYValueAxisStrategy {
  create(root: Root, chart: XYChart): ValueAxis<AxisRenderer> {
    return chart.yAxes.push(
      ValueAxis.new(root, {
        renderer: AxisRendererY.new(root, {}),
        extraMax: 0.1,
        extraMin: 0.1,
        autoZoom: false,
      }),
    );
  }
}
