import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChart, ChartComponent } from '@healthcare/charts';
import { LoaderComponent } from '@healthcare/ui';
import { ModuleChartContext } from '../../../enums/module-chart-type.enum';
import { ModulePrimitive } from '../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../models/module-inject.model';
import { createViewChart } from '../../../utils/create-view-chart.util';
import { ModuleDirectionComponent } from '../../module-shared/module-direction/module-direction.component';

@Component({
  selector: 'lib-module-overview-card',
  imports: [DatePipe, ModuleDirectionComponent, ChartComponent, LoaderComponent],
  templateUrl: './module-overview-card.component.html',
  styleUrl: './module-overview-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleOverviewCardComponent implements OnInit {
  readonly viewType = ModuleChartContext.Overview;

  private readonly route = inject(ActivatedRoute);

  readonly module = inject(MODULE);
  readonly data = signal<ModulePrimitive[][] | null>(null);
  readonly chart = signal<BaseChart | null>(null);

  readonly latestRecord = computed(() => this.data()?.at(0)?.at(-1));
  readonly value = computed(() => {
    const value = this.latestRecord()?.value;
    const unit = this.module.getUnit();
    if (!unit || !value) return value;
    return unit.format(value);
  });
  readonly unit = this.module.getUnit()?.shortName;

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('patientId');
    if (!patientId) return;

    const chart = createViewChart(this.module, this.viewType);
    if (chart) this.chart.set(chart);

    this.module.dataSource
      .getData(patientId, this.module.moduleId)
      .subscribe((data) => this.data.set([data]));
  }
}
