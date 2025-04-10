import { ChartContext } from './chart-context.interface';

export interface ChartFeature {
  apply(context: ChartContext): void;
}
