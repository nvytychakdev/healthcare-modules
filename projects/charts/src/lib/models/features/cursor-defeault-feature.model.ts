import { XYCursor } from '@amcharts/amcharts5/.internal/charts/xy/XYCursor';
import { ChartContext } from '../../interfaces/chart-context.interface';
import { ChartFeature } from '../../interfaces/chart-feature.interface';

export class CursorDefaultFeature implements ChartFeature {
  apply(context: ChartContext): void {
    const { root, chart } = context;
    const cursor = chart.set(
      'cursor',
      XYCursor.new(root, {
        behavior: 'zoomX',
      }),
    );
    cursor.lineY.set('visible', false);
  }
}
