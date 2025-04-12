import {
  AxisValueDefaultStrategy,
  BaseChart,
  ChartBuilder,
  ChartXYSeriesStrategy,
  ChartXYValueAxisStrategy,
  LineChartFactrory,
  LineChartMinimalFactrory,
  SeriesLineDefaultStrategy,
} from '@healthcare/charts';
import { ChartCompositeBuilder } from '../../../../../charts/src/lib/models/builders/chart-composite.builder';
import { ModuleChartContext } from '../../enums/module-chart-type.enum';
import { ModuleChartRenderer } from '../module-chart-renderer.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    if (context === ModuleChartContext.Overview) {
      return new ChartBuilder(new LineChartMinimalFactrory(), this.fields).build(root);
    }

    if (context === ModuleChartContext.Details) {
      return new ChartBuilder(new LineChartFactrory(), this.fields).build(root);
    }

    throw new Error(`Context ${context} is not implemented`);
  }

  createCompositeChart(
    root: string,
    compareYAxesStrategy: ChartXYValueAxisStrategy = new AxisValueDefaultStrategy(),
    compareSeriesStrategy: ChartXYSeriesStrategy = new SeriesLineDefaultStrategy(this.fields),
  ) {
    const yAxes = this.yAxesStrategy || new AxisValueDefaultStrategy();
    const series = this.seriesStrategy || new SeriesLineDefaultStrategy(this.fields);

    return new ChartCompositeBuilder()
      .withValueAxisStrategies([yAxes, compareYAxesStrategy])
      .withSeriesStrategy([series, compareSeriesStrategy])
      .build(root);
  }

  override getCompositeStrategies(): {
    yAxisStrategy: ChartXYValueAxisStrategy | undefined;
    seriesStrategy: ChartXYSeriesStrategy | undefined;
  } {
    return {
      yAxisStrategy: this.yAxesStrategy || new AxisValueDefaultStrategy(),
      seriesStrategy: this.seriesStrategy || new SeriesLineDefaultStrategy(this.fields),
    };
  }
}
