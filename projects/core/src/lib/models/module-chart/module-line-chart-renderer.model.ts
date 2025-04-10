import {
  AxisValueDefaultStrategy,
  BaseChart,
  ChartBuilder,
  LineChartFactrory,
} from '@healthcare/charts';
import { LineChartMinimalFactrory } from '../../../../../charts/src/lib/models/factories/line-chart-minimal.factory';
import { ModuleChartContext } from '../../enums/module-chart-type.enum';
import { ModuleChartRenderer } from '../module-chart-renderer.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    if (context === ModuleChartContext.Overview) {
      return new ChartBuilder(new LineChartMinimalFactrory(), this.fields).build(root);
    }

    if (context === ModuleChartContext.Details) {
      return new ChartBuilder(new LineChartFactrory(), this.fields).build(root);
    }

    if (context === ModuleChartContext.OverlayVitals) {
      return new ChartBuilder().withValueAxisStrategy(new AxisValueDefaultStrategy()).build(root);
    }

    throw new Error(`Context ${context} is not implemented`);
  }
}
