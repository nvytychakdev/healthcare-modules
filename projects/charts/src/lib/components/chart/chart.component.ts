import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { BaseChart } from '../../models/base-chart.model';
import { ChartLifecycle } from '../../models/chart-lifecycle.model';

@Component({
  selector: 'lib-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent extends ChartLifecycle {
  readonly chart = input.required<BaseChart>();
  readonly data = input.required<unknown[][]>();

  constructor() {
    super();

    effect(() => {
      this.chart().bindData(...this.data());
    });
  }

  override initializeChart(): void {
    const { root } = this.chart().render();
    this.chart().bindData(...this.data());
    this.root = root;
  }
}
