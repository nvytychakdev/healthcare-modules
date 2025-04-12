import {
  AxisValueDefaultStrategy,
  BaseChart,
  ChartBuilder,
  ChartXYValueAxisStrategy,
  CursorDefaultFeature,
  LineChartFactrory,
  LineChartMinimalFactrory,
  ScrollbarDefaultStrategy,
  SeriesLineDefaultStrategy,
} from '@healthcare/charts';
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
    compositeStrategy: ChartXYValueAxisStrategy = this.getDefaultCompositeStrategy(),
  ) {
    // original module yAxes registered in module configuration
    // if missing, default line chart axis and series will be used instead
    const yAxis = this.yAxesStrategy || this.getDefaultCompositeStrategy();

    return new ChartBuilder()
      .withValueAxisStrategies([yAxis, compositeStrategy])
      .withFeature(new ScrollbarDefaultStrategy())
      .withFeature(new CursorDefaultFeature())
      .build(root);
  }

  override getCompositeStrategy(): ChartXYValueAxisStrategy | undefined {
    return this.yAxesStrategy || this.getDefaultCompositeStrategy();
  }

  private getDefaultCompositeStrategy(): ChartXYValueAxisStrategy {
    return new AxisValueDefaultStrategy([new SeriesLineDefaultStrategy(this.fields)]);
  }
}
