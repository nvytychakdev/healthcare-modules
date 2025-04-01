import { Bullet, Circle, color, DataProcessor, Root, Theme, Tooltip } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
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
  private readonly themeColors = ['#82c535', '#087f8c', '#00ceb0'];

  override render(): ChartRender {
    const root = this.createRoot();
    this.applyThemes(root);

    const chart = this.createChart(root);
    const xAxis = this.createXAxis(root, chart);
    const yAxis = this.createYAxis(root, chart);
    const series = this.createSeries(root, chart, xAxis, yAxis);

    series.appear(1000);
    chart.appear(1000, 100);

    return { root, series, chart };
  }

  private applyThemes(root: Root): void {
    const theme = Theme.new(root);
    theme.rule('ColorSet').set('colors', this.themeColors.map(color));

    root.setThemes([AnimatedTheme.new(root), DarkTheme.new(root), theme]);
  }

  private createChart(root: Root): XYChart {
    return root.container.children.push(XYChart.new(root, {}));
  }

  private createXAxis(root: Root, chart: XYChart): DateAxis<AxisRenderer> {
    return chart.xAxes.push(
      DateAxis.new(root, {
        baseInterval: { timeUnit: 'day', count: 1 },
        renderer: AxisRendererX.new(root, {}),
        tooltip: Tooltip.new(root, {}),
      }),
    );
  }

  private createYAxis(root: Root, chart: XYChart): ValueAxis<AxisRenderer> {
    return chart.yAxes.push(
      ValueAxis.new(root, {
        renderer: AxisRendererY.new(root, {}),
      }),
    );
  }

  private createSeries(
    root: Root,
    chart: XYChart,
    xAxis: DateAxis<AxisRenderer>,
    yAxis: ValueAxis<AxisRenderer>,
  ): LineSeries {
    const series = chart.series.push(
      LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: this.fields.valueYField,
        valueXField: this.fields.valueXField,
        tooltip: Tooltip.new(root, { labelText: '{valueY}' }),
      }),
    );

    this.configureDataProcessor(root, series);
    this.addBullets(root, series);

    return series;
  }

  private configureDataProcessor(root: Root, series: LineSeries): void {
    series.data.processor = DataProcessor.new(root, {
      dateFormat: 'i',
      dateFields: [this.fields.valueXField],
    });
  }

  private addBullets(root: Root, series: LineSeries): void {
    series.bullets.push(() => {
      const bulletCircle = Circle.new(root, {
        radius: 5,
        fill: series.get('fill'),
      });

      return Bullet.new(root, { sprite: bulletCircle });
    });
  }
}
