import { Series } from '@amcharts/amcharts5';
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
  readonly data = input.required<unknown[]>();

  private series?: Series;

  constructor() {
    super();

    effect(() => {
      this.series?.data.setAll(this.data());
    });
  }

  override initializeChart(): void {
    const { root, series } = this.chart().render();

    series.data.setAll(this.data());

    this.root = root;
    this.series = series;
  }
}
