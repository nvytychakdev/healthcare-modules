import { ChartFeature } from './chart-feature.interface';
import { ChartRenderFields } from './chart-render-fields.interface';
import {
  ChartXYDateAxisStrategy,
  ChartXYSeriesTooltipStrategy,
  ChartXYStrategy,
  ChartXYValueAxisStrategy,
} from './chart-strategy.interface';

export interface ChartFactory {
  createChart(): ChartXYStrategy;
  createValueAxes(
    fields?: ChartRenderFields,
    tooltip?: ChartXYSeriesTooltipStrategy,
  ): ChartXYValueAxisStrategy[];
  createDateAxis(): ChartXYDateAxisStrategy;
  createCursor(): ChartFeature;
  createScrollbar(): ChartFeature | undefined;
}
