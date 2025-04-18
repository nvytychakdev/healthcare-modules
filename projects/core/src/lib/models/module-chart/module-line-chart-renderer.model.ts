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
import { ModuleChartContext } from '../../enums/module-chart-context.enum';
import { ModuleValueContext } from '../../enums/module-value-context.enum';
import { createTooltipHTML } from '../../utils/create-tooltip-html.util';
import { ModuleChartRenderer } from '../module-chart-renderer.model';
import { getPreferredUnitDataTransformer } from '../module-data-transformers/module-data-transformers-default.model';
import { ModuleUnit } from '../module-unit.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    if (!this.moduleRef) {
      throw new Error(
        'Not ablet to create chart without module refrence. Use `withModule(ref)` before calling this method.',
      );
    }

    const tooltip = this.createModuleTooltip(this.preferredUnit);
    const transformerFn = getPreferredUnitDataTransformer(
      ModuleValueContext.Details,
      this.moduleRef,
      this.preferredUnit,
    );

    if (context === ModuleChartContext.Overview) {
      return new ChartBuilder(new LineChartMinimalFactrory(), this.fields, tooltip, [
        transformerFn,
      ]).build(root);
    }

    if (context === ModuleChartContext.Details) {
      return new ChartBuilder(new LineChartFactrory(), this.fields, tooltip, [transformerFn]).build(
        root,
      );
    }

    throw new Error(`Context ${context} is not implemented`);
  }

  createCompositeChart(root: string, yAxisComposite: ChartXYValueAxisStrategy) {
    if (!this.moduleRef) {
      throw new Error(
        'Not ablet to create chart without module refrence. Use `withModule(ref)` before calling this method.',
      );
    }

    // original module yAxes registered in module configuration
    // if missing, default line chart axis and series will be used instead
    const yAxis = this.yAxesStrategy || this.getDefaultCompositeStrategy(this.preferredUnit);

    return new ChartBuilder()
      .withValueAxisStrategies([yAxis, yAxisComposite])
      .withFeature(new ScrollbarDefaultStrategy())
      .withFeature(new CursorDefaultFeature())
      .build(root);
  }

  override getCompositeStrategy(preferredUnit?: ModuleUnit): ChartXYValueAxisStrategy | undefined {
    return this.yAxesStrategy || this.getDefaultCompositeStrategy(preferredUnit);
  }

  private getDefaultCompositeStrategy(preferredUnit?: ModuleUnit): ChartXYValueAxisStrategy {
    const transformer = getPreferredUnitDataTransformer(
      ModuleValueContext.Details,
      this.moduleRef,
      preferredUnit,
    );

    const series = new SeriesLineDefaultStrategy(this.fields)
      .withTooltipStrategy(this.createModuleTooltip(preferredUnit))
      .withDataTransformer(transformer);

    return new AxisValueDefaultStrategy([series]);
  }

  private createModuleTooltip(unit?: ModuleUnit): ChartXYSeriesTooltipStrategy {
    return new TooltipDefaultStrategy(createTooltipHTML(unit?.shortName));
  }
}
