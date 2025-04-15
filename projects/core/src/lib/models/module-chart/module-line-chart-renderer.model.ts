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
import { ModuleUnit } from '../module-unit.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    const tooltip = this.getDefaultTooltip(this.units);

    if (context === ModuleChartContext.Overview) {
      return new ChartBuilder(new LineChartMinimalFactrory(), this.fields, tooltip).build(root);
    }

    if (context === ModuleChartContext.Details) {
      return new ChartBuilder(new LineChartFactrory(), this.fields, tooltip).build(root);
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
    return new AxisValueDefaultStrategy([
      new SeriesLineDefaultStrategy(this.fields, this.getDefaultTooltip(this.units)),
    ]);
  }

  private getDefaultTooltip(units?: Map<string, ModuleUnit>): ChartXYSeriesTooltipStrategy {
    const unit = units?.values().next().value;
    return new TooltipDefaultStrategy(createTooltipHTML(unit?.shortName));
  }
}
