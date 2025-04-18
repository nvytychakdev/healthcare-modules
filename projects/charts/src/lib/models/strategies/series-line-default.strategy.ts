import { Bullet, Circle, DataProcessor, Root } from '@amcharts/amcharts5';
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';
import { DateAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/DateAxis';
import { ValueAxis } from '@amcharts/amcharts5/.internal/charts/xy/axes/ValueAxis';
import { LineSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/LineSeries';
import { XYSeries } from '@amcharts/amcharts5/.internal/charts/xy/series/XYSeries';
import { XYChart } from '@amcharts/amcharts5/.internal/charts/xy/XYChart';
import { ChartDataTransformerStrategy } from '../../interfaces/chart-data-transformer.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYSeriesStrategy,
  ChartXYSeriesTooltipStrategy,
} from '../../interfaces/chart-strategy.interface';
import { CHART_RENDER_FIELDS_DEFAULT } from '../base-chart.model';
import { TooltipDefaultStrategy } from './tooltip-default.strategy';

export class SeriesLineDefaultStrategy implements ChartXYSeriesStrategy {
  private series?: XYSeries;
  private _tooltipStrategy: ChartXYSeriesTooltipStrategy = new TooltipDefaultStrategy();
  private readonly _dataTransformers: ChartDataTransformerStrategy[] = [];

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
        tooltip: this._tooltipStrategy.create(root),
      }),
    );

    this.configureDataProcessor(root, series);
    this.addBullets(root, series);

    this.series = series;
    return series;
  }

  bindData(data: unknown[]): void {
    const transformedData = this.applyDataTransformers(data);
    this.series?.data.setAll(transformedData);
  }

  withDataTransformer(transformer?: ChartDataTransformerStrategy) {
    if (transformer) this._dataTransformers.push(transformer);
    return this;
  }

  withTooltipStrategy(tooltip?: ChartXYSeriesTooltipStrategy) {
    if (tooltip) this._tooltipStrategy = tooltip;
    return this;
  }

  private applyDataTransformers(data: unknown[]): unknown[] {
    if (!this._dataTransformers.length) return data;
    return this._dataTransformers.reduce((acc, transformFn) => transformFn(acc), data);
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
