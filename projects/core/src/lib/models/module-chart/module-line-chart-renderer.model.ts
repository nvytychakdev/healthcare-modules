import { BaseChart, LineChart } from '@healthcare/charts';
import { ModuleChartContext } from '../../enums/module-chart-type.enum';
import { ModuleChartRenderer } from '../../interfaces/module-chart-renderer.interface';

export class ModuleLineChartRenderer implements ModuleChartRenderer {
  createChart(root: string, context: ModuleChartContext): BaseChart {
    console.log('Rendering...', root, context);
    return new LineChart(root);
  }
}
