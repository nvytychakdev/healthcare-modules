import { BaseChart, LineChart } from '@healthcare/charts';
import { ModuleChartContext } from '../../enums/module-chart-type.enum';
import { ModuleChartRenderer } from '../module-chart-renderer.model';

export class ModuleLineChartRenderer extends ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    if (context === ModuleChartContext.Overview) return new LineChart(root, this.fields);
    return new LineChart(root, this.fields);
  }
}
