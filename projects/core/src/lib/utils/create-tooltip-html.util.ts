import { ModuleChartContext } from '../enums/module-chart-context.enum';

export const createTooltipHTML = (
  context: ModuleChartContext,
  unit: string = '',
  value: string = '{valueY}',
) => {
  return `
    <div class="module-tooltip ${context === ModuleChartContext.Overview ? 'module-tooltip-compact' : ''}">
      <div class="module-tooltip-value">
        <span class="module-tooltip-main">${value}</span>
        <span class="module-tooltip-unit">${unit}</span>
      </div>
      <div class="module-tooltip-date">{valueX.formatDate('HH:mm:ss - MMM dd, YYYY')}</div>
    </div>
  `;
};
