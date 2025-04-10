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
import { CursorDefaultFeature } from '../features/cursor-defeault-feature.model';
import { AxisDateDefaultStrategy } from '../strategies/axis-date-default.strategy';
import { AxisValueDefaultStrategy } from '../strategies/axis-value-default.strategy';
import { ChartDefaultStrategy } from '../strategies/chart-default.strategy';
import { ScrollbarDefaultStrategy } from '../strategies/scrollbar-default.strategy';
import { SeriesLineDefaultStrategy } from '../strategies/series-line-default.strategy';

export class LineChartFactrory implements ChartFactory {
  createChart(): ChartXYStrategy {
    return new ChartDefaultStrategy();
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
    return new CursorDefaultFeature();
  }

  createScrollbar(): ChartXYScrollbarStrategy | undefined {
    return new ScrollbarDefaultStrategy();
  }
}
