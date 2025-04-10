import { ChartFactory } from '../../interfaces/chart-factory.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';
import { ChartRenderFields } from '../../interfaces/chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYSeriesStrategy,
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

  createValueAxis(): ChartXYValueAxisStrategy {
    return new AxisValueDefaultStrategy();
  }

  createDateAxis(): ChartXYDateAxisStrategy {
    return new AxisDateDefaultStrategy();
  }

  createSeries(fields?: ChartRenderFields): ChartXYSeriesStrategy {
    return new SeriesLineDefaultStrategy(fields);
  }

  createCursor(): ChartFeature {
    return new CursorMinimalFeature();
  }

  createScrollbar(): ChartXYScrollbarStrategy | undefined {
    return undefined;
  }
}
