import { Bullet, Circle, color, DataProcessor, Theme, Tooltip } from '@amcharts/amcharts5';
import { AxisRendererX } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererX';
import { AxisRendererY } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRendererY';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { LineSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/LineSeries';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import AnimatedTheme from '@amcharts/amcharts5/themes/Animated';
import DarkTheme from '@amcharts/amcharts5/themes/Dark';
import { ChartRender } from '../../interfaces/chart-render.interface';
import { BaseChart } from '../base-chart.model';

export class LineChart extends BaseChart {
  override render(): ChartRender {
    const root = this.createRoot();

    const theme = Theme.new(root);
    theme.rule('ColorSet').set('colors', [color('#82c535'), color('#087f8c'), color('#00ceb0')]);

    root.setThemes([AnimatedTheme.new(root), DarkTheme.new(root), theme]);
    const chart = root.container.children.push(XYChart.new(root, {}));

    const xAxis = chart.xAxes.push(
      DateAxis.new(root, {
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: AxisRendererX.new(root, {}),
        tooltip: Tooltip.new(root, {}),
      }),
    );

    const yAxis = chart.yAxes.push(
      ValueAxis.new(root, {
        renderer: AxisRendererY.new(root, {}),
      }),
    );

    const series = chart.series.push(
      LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'createDateTime',
        tooltip: Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      }),
    );

    series.data.processor = DataProcessor.new(root, {
      dateFormat: 'i',
      dateFields: ['createDateTime'],
    });

    series.bullets.push(() => {
      let bulletCircle = Circle.new(root, {
        radius: 5,
        fill: series.get('fill'),
      });
      return Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    series.appear(1000);
    chart.appear(1000, 100);

    return { root, series, chart };
  }
}
