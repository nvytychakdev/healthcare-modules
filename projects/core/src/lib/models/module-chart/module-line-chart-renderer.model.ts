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
import { ModuleChartTooltipTemplate } from '../../interfaces/module-tooltip-template.interface';
import { createTooltipHTML } from '../../utils/create-tooltip-html.util';
import { ModuleChartRenderer } from '../module-chart-renderer.model';
import { ModuleUnit } from '../module-unit.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  private _tooltipTemplate: ModuleChartTooltipTemplate = (
    context: ModuleChartContext,
    unit?: ModuleUnit,
  ) => createTooltipHTML(context, unit?.shortName);

  createChart(root: string, context: ModuleChartContext): BaseChart {
    if (!this.moduleRef) {
      throw new Error(
        'Not ablet to create chart without module refrence. Use `withModule(ref)` before calling this method.',
      );
    }

    const tooltip = this.createModuleTooltip(context, this.preferredUnit);
    const dataTransformers = this.moduleRef.dataSource.dataTransformers.map((transformer) =>
      transformer(ModuleValueContext.Details, this.preferredUnit),
    );

    if (context === ModuleChartContext.Overview) {
      return new ChartBuilder(
        new LineChartMinimalFactrory(),
        this.fields,
        tooltip,
        dataTransformers,
      ).build(root);
    }

    if (context === ModuleChartContext.Details) {
      return new ChartBuilder(
        new LineChartFactrory(),
        this.fields,
        tooltip,
        dataTransformers,
      ).build(root);
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

  withTooltipTemplate(template: ModuleChartTooltipTemplate) {
    this._tooltipTemplate = template;
    return this;
  }

  override getCompositeStrategy(preferredUnit?: ModuleUnit): ChartXYValueAxisStrategy | undefined {
    return this.yAxesStrategy || this.getDefaultCompositeStrategy(preferredUnit);
  }

  private getDefaultCompositeStrategy(preferredUnit?: ModuleUnit): ChartXYValueAxisStrategy {
    const series = new SeriesLineDefaultStrategy(this.fields).withTooltipStrategy(
      this.createModuleTooltip(ModuleChartContext.OverlayVitals, preferredUnit),
    );

    // fill series with data transformers
    this.moduleRef?.dataSource.dataTransformers.forEach((transformer) => {
      const transformerFn = transformer(ModuleValueContext.Details, preferredUnit);
      series.withDataTransformer(transformerFn);
    });

    return new AxisValueDefaultStrategy([series]);
  }

  private createModuleTooltip(
    context: ModuleChartContext,
    unit?: ModuleUnit,
  ): ChartXYSeriesTooltipStrategy {
    return new TooltipDefaultStrategy().withTemplate(this._tooltipTemplate(context, unit));
  }
}
