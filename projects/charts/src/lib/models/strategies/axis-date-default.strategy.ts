import { Root, Tooltip } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { AxisRendererX } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererX';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { ChartXYDateAxisStrategy } from '../../interfaces/chart-strategy.interface';

export class AxisDateDefaultStrategy implements ChartXYDateAxisStrategy {
  create(root: Root, chart: XYChart): DateAxis<AxisRenderer> {
    return chart.xAxes.push(
      DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: AxisRendererX.new(root, {}),
        tooltip: Tooltip.new(root, {}),
      }),
    );
  }
}
