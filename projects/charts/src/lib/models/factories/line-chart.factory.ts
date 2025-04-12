import { ChartFactory } from '../../interfaces/chart-factory.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
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

  createValueAxes(fields?: ChartRenderFields): ChartXYValueAxisStrategy[] {
    return [new AxisValueDefaultStrategy([new SeriesLineDefaultStrategy(fields)])];
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
