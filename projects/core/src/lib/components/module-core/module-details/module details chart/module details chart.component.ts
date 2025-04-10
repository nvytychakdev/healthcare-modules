import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChart, ChartComponent } from '@healthcare/charts';
import { LoaderComponent } from '@healthcare/ui';
import { ModuleChartContext } from '../../../../enums/module-chart-type.enum';
import { ModulePrimitive } from '../../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../../models/module-inject.model';
import { createViewChart } from '../../../../utils/create-view-chart.util';

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

  readonly chart = signal<BaseChart | undefined>(undefined);
  readonly data = signal<ModulePrimitive[] | undefined>(undefined);

  ngOnInit(): void {
    const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!patientId) return;

    const chart = createViewChart(this.module, this.viewType);
    if (chart) this.chart.set(chart);

    this.module.dataSource
      .getData(patientId, this.module.moduleId)
      .subscribe((data) => this.data.set(data));
  }
}
