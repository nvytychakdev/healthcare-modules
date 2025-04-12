import { ChartFeature } from './chart-feature.interface';
import { ChartRenderFields } from './chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from './chart-strategy.interface';

export interface ChartFactory {
  createChart(): ChartXYStrategy;
  createValueAxes(fields?: ChartRenderFields): ChartXYValueAxisStrategy[];
  createDateAxis(): ChartXYDateAxisStrategy;
  createCursor(): ChartFeature;
  createScrollbar(): ChartFeature | undefined;
}
