import { ChartDataTransformerStrategy } from './chart-data-transformer.interface';
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
    transformers?: ChartDataTransformerStrategy[],
  ): ChartXYValueAxisStrategy[];
  createDateAxis(): ChartXYDateAxisStrategy;
  createCursor(): ChartFeature;
  createScrollbar(): ChartFeature | undefined;
}
