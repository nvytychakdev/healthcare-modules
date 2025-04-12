import { Bullet, Circle, DataProcessor, Root, Tooltip } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { LineSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/LineSeries';
import { XYSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import { ChartXYSeriesStrategy } from '../../interfaces/chart-strategy.interface';
import { CHART_RENDER_FIELDS_DEFAULT } from '../base-chart.model';

export class SeriesLineDefaultStrategy implements ChartXYSeriesStrategy {
  private series?: XYSeries;

  constructor(private fields: ChartRenderFields = CHART_RENDER_FIELDS_DEFAULT) {}

  create(
    root: Root,
    chart: XYChart,
    xAxis: DateAxis<AxisRenderer>,
    yAxis: ValueAxis<AxisRenderer>,
  ): XYSeries {
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

    this.series = series;
    return series;
  }

  bindData(data: unknown[]): void {
    this.series?.data.setAll(data);
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
