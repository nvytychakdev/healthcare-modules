import { ChartDataTransformerStrategy } from '../../interfaces/chart-data-transformer.interface';
import { ChartFactory } from '../../interfaces/chart-factory.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYSeriesTooltipStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { CursorDefaultFeature } from '../features/cursor-defeault.feature';
import { ScrollbarDefaultStrategy } from '../features/scrollbar-default.feature';
import { AxisDateDefaultStrategy } from '../strategies/axis-date-default.strategy';
import { AxisValueDefaultStrategy } from '../strategies/axis-value-default.strategy';
import { ChartDefaultStrategy } from '../strategies/chart-default.strategy';
import { SeriesLineDefaultStrategy } from '../strategies/series-line-default.strategy';

export class LineChartFactrory implements ChartFactory {
  createChart(): ChartXYStrategy {
    return new ChartDefaultStrategy();
  }

  createValueAxes(
    fields?: ChartRenderFields,
    tooltip?: ChartXYSeriesTooltipStrategy,
    transformers?: ChartDataTransformerStrategy[],
  ): ChartXYValueAxisStrategy[] {
    const series = new SeriesLineDefaultStrategy(fields).withTooltipStrategy(tooltip);

    // attach data transformers to the series, if provided
    transformers?.forEach((transformers) => {
      series.withDataTransformer(transformers);
    });

    const axis = new AxisValueDefaultStrategy([series]);
    return [axis];
  }

  createDateAxis(): ChartXYDateAxisStrategy {
    return new AxisDateDefaultStrategy();
  }

  createCursor(): ChartFeature {
    return new CursorDefaultFeature();
  }

  createScrollbar(): ChartFeature | undefined {
    return new ScrollbarDefaultStrategy();
  }
}
