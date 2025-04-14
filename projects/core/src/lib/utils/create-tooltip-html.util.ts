export const createTooltipHTML = (unit: string = '', value: string = '{valueY}') => {
  return `
    <div class="module-tooltip">
      <div class="module-tooltip-value">
        <span class="module-tooltip-main">${value}</span>
        <span class="module-tooltip-unit">${unit}</span>
      </div>
    </div>
  `;
};
