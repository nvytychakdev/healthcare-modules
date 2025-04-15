import {
  AxisValueDefaultStrategy,
  BaseChart,
  ChartBuilder,
  ChartXYSeriesTooltipStrategy,
  ChartXYValueAxisStrategy,
  CursorDefaultFeature,
  LineChartFactrory,
  LineChartMinimalFactrory,
  ScrollbarDefaultStrategy,
  SeriesLineDefaultStrategy,
  TooltipDefaultStrategy,
} from '@healthcare/charts';
import { ModuleChartContext } from '../../enums/module-chart-type.enum';
import { createTooltipHTML } from '../../utils/create-tooltip-html.util';
import { ModuleChartRenderer } from '../module-chart-renderer.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    const tooltip = this.getDefaultTooltip(this.preferredUnit);

    if (context === ModuleChartContext.Overview) {
      return new ChartBuilder(new LineChartMinimalFactrory(), this.fields, tooltip).build(root);
    }

    if (context === ModuleChartContext.Details) {
      return new ChartBuilder(new LineChartFactrory(), this.fields, tooltip).build(root);
    }

    throw new Error(`Context ${context} is not implemented`);
  }

  createCompositeChart(root: string, yAxisComposite: ChartXYValueAxisStrategy) {
    // original module yAxes registered in module configuration
    // if missing, default line chart axis and series will be used instead
    const yAxis = this.yAxesStrategy || this.getDefaultCompositeStrategy(this.preferredUnit);

    return new ChartBuilder()
      .withValueAxisStrategies([yAxis, yAxisComposite])
      .withFeature(new ScrollbarDefaultStrategy())
      .withFeature(new CursorDefaultFeature())
      .build(root);
  }

  override getCompositeStrategy(preferredUnit?: string): ChartXYValueAxisStrategy | undefined {
    return this.yAxesStrategy || this.getDefaultCompositeStrategy(preferredUnit);
  }

  private getDefaultCompositeStrategy(preferredUnit?: string): ChartXYValueAxisStrategy {
    return new AxisValueDefaultStrategy([
      new SeriesLineDefaultStrategy(this.fields, this.getDefaultTooltip(preferredUnit)),
    ]);
  }

  private getDefaultTooltip(preferredUnit?: string): ChartXYSeriesTooltipStrategy {
    const unit = preferredUnit ? this.units?.get(preferredUnit) : this.units?.values().next().value;
    return new TooltipDefaultStrategy(createTooltipHTML(unit?.shortName));
  }
}
