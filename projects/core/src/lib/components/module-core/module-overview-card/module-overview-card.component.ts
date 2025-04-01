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
import { v4 as uuidv4 } from 'uuid';
import { ModuleChartContext } from '../../../enums/module-chart-type.enum';
import { ModulePrimitive } from '../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../models/module-inject.model';
import { ModuleDirectionComponent } from '../../module-shared/module-direction/module-direction.component';

@Component({
  selector: 'lib-module-overview-card',
  imports: [DatePipe, ModuleDirectionComponent, ChartComponent],
  templateUrl: './module-overview-card.component.html',
  styleUrl: './module-overview-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleOverviewCardComponent implements OnInit {
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
