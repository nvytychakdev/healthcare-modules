import { ModuleChartContext } from '../enums/module-chart-context.enum';
import { ModuleUnit } from '../models/module-unit.model';

export type ModuleChartTooltipTemplate = (context: ModuleChartContext, unit?: ModuleUnit) => string;
