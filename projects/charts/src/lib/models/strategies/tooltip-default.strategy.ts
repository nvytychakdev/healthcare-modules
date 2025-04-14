import { color, PointedRectangle, Root, Tooltip } from '@amcharts/amcharts5';
import { ChartXYSeriesTooltipStrategy } from '../../interfaces/chart-strategy.interface';

export class TooltipDefaultStrategy implements ChartXYSeriesTooltipStrategy {
  constructor(private labelHTML: string = '{valueY}') {}

  create(root: Root): Tooltip {
    const tooltip = Tooltip.new(root, {
      getFillFromSprite: false,
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 16,
      paddingBottom: 14,
      minWidth: 40,
      minHeight: 40,
      labelHTML: this.labelHTML,
      autoTextColor: false,
    });

    tooltip.label.setAll({
      fill: color('#ffffff'),
    });

    const tooltipBackground = tooltip.get('background');
    if (tooltipBackground instanceof PointedRectangle) {
      tooltipBackground?.setAll({
        fill: color('#262626'),
        fillOpacity: 1,
        stroke: color('#404040'),
        strokeWidth: 1,
        cornerRadius: 14,
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        shadowBlur: 6,
        shadowOpacity: 0.24,
        shadowColor: color('#000000'),
      });
    }

    return tooltip;
  }
}
