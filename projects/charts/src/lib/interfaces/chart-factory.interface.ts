import { ChartFeature } from './chart-feature.interface';
import { ChartRenderFields } from './chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYScrollbarStrategy,
  ChartXYSeriesStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from './chart-strategy.interface';

export interface ChartFactory {
  createChart(): ChartXYStrategy;
  createValueAxis(): ChartXYValueAxisStrategy;
  createDateAxis(): ChartXYDateAxisStrategy;
  createCursor(): ChartFeature;
  createScrollbar(): ChartXYScrollbarStrategy | undefined;
  createSeries(fields?: ChartRenderFields): ChartXYSeriesStrategy;
}
