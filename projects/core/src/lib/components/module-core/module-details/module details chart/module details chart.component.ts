import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChart, ChartComponent } from '@healthcare/charts';
import { LoaderComponent } from '@healthcare/ui';
import { ModuleChartContext } from '../../../../enums/module-chart-type.enum';
import { ModulePrimitive } from '../../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../../models/module-inject.model';
import { Module } from '../../../../models/module.model';
import {
  createCompositeViewChart,
  createViewChart,
} from '../../../../utils/create-view-chart.util';

@Component({
  selector: 'lib-module-details-chart',
  imports: [ChartComponent, LoaderComponent],
  templateUrl: './module details chart.component.html',
  styleUrl: './module details chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDetailsChartComponent implements OnInit {
  private readonly viewType = ModuleChartContext.Details;
  private readonly module = inject(MODULE);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly compareModule = input<Module | undefined>(undefined);
  readonly data = input<ModulePrimitive[][] | undefined>(undefined);

  readonly chart = signal<BaseChart | undefined>(undefined);

  ngOnInit(): void {
    const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    if (!patientId) return;

    const compareModule = this.compareModule();
    if (compareModule) {
      const chart = createCompositeViewChart(this.module, compareModule);
      if (chart) this.chart.set(chart);
      return;
    }

    const chart = createViewChart(this.module, this.viewType);
    if (chart) this.chart.set(chart);
  }
}
