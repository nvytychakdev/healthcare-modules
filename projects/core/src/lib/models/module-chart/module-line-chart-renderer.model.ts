import { ModuleChartContext } from '../../enums/module-chart-type.enum';
import { ModuleChartRenderer } from '../../interfaces/module-chart-renderer.interface';

export class ModuleLineChartRenderer implements ModuleChartRenderer {
  createChart(root: HTMLElement, context: ModuleChartContext): void {
    console.log('Rendering...', root, context);
  }
}
