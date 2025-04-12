import { ChartFactory } from '../../interfaces/chart-factory.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from '../../interfaces/chart-strategy.interface';
import { CursorMinimalFeature } from '../features/cursor-minimal-feature.model';
import { AxisDateDefaultStrategy } from '../strategies/axis-date-default.strategy';
import { AxisValueDefaultStrategy } from '../strategies/axis-value-default.strategy';
import { ChartMinimalStrategy } from '../strategies/chart-minimal.strategy';
import { SeriesLineDefaultStrategy } from '../strategies/series-line-default.strategy';

export class LineChartMinimalFactrory implements ChartFactory {
  createChart(): ChartXYStrategy {
    return new ChartMinimalStrategy();
  }

  createValueAxes(fields?: ChartRenderFields): ChartXYValueAxisStrategy[] {
    return [new AxisValueDefaultStrategy([new SeriesLineDefaultStrategy(fields)])];
  }

  createDateAxis(): ChartXYDateAxisStrategy {
    return new AxisDateDefaultStrategy();
  }

  createCursor(): ChartFeature {
    return new CursorMinimalFeature();
  }

  createScrollbar(): ChartXYScrollbarStrategy | undefined {
    return undefined;
  }
}
