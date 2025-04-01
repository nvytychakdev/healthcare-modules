import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChart, ChartComponent } from '@healthcare/charts';
import {
  MODULE,
  ModuleChartContext,
  ModuleDirectionComponent,
  ModulePrimitive,
} from '@healthcare/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'lib-temperature-overview',
  imports: [ModuleDirectionComponent, DatePipe, ChartComponent],
  templateUrl: './temperature-overview.component.html',
  styleUrl: './temperature-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureOverviewComponent {
  readonly viewType = ModuleChartContext.Overview;

  private readonly route = inject(ActivatedRoute);
  readonly module = inject(MODULE);

  readonly data = signal<ModulePrimitive[] | null>(null);
  readonly chart = signal<BaseChart | null>(null);

  readonly latestRecord = computed(() => this.data()?.at(-1));

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (!patientId) return;

    const renderer = this.module.view.getChartRenderers(ModuleChartContext.Overview);
    const chart = renderer?.createChart(uuidv4(), ModuleChartContext.Overview);

    if (chart) this.chart.set(chart);

    this.module.dataSource
      .getData(patientId, this.module.moduleId)
      .subscribe((data) => this.data.set(data));
  }
}
