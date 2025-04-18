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
import { ModuleChartContext } from '../../../enums/module-chart-context.enum';
import { ModuleValueContext } from '../../../enums/module-value-context.enum';
import { ModulePrimitive } from '../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../models/module-inject.model';
import { ModuleStateService } from '../../../services/module-state.service';
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

  private readonly moduleState = inject(ModuleStateService);
  private readonly route = inject(ActivatedRoute);

  readonly module = inject(MODULE);
  readonly data = signal<ModulePrimitive[][] | null>(null);
  readonly chart = signal<BaseChart | null>(null);

  readonly dataSet = computed(() => this.data()?.at(0));
  readonly record = computed(() =>
    this.module.valueResolver.resolveRecord(ModuleValueContext.Overview, this.dataSet() || []),
  );
  readonly preferredUnit = this.moduleState.getPreferredUnit(this.module.moduleId);
  readonly unit = this.module.valueResolver.resolveUnit(
    ModuleValueContext.Overview,
    this.preferredUnit,
  );

  readonly value = computed(() => {
    const data = this.record();
    if (!data) return undefined;
    return this.module.valueResolver.resolveValue(ModuleValueContext.Overview, data, this.unit);
  });

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('patientId');
    if (!patientId) return;

    const chart = createViewChart(this.module, this.viewType, this.preferredUnit);
    if (chart) this.chart.set(chart);

    this.module.dataSource
      .getData(patientId, this.module.moduleId)
      .subscribe((data) => this.data.set([data]));
  }
}
