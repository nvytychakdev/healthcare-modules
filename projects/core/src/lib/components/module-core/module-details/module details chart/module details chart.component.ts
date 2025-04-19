import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChart, ChartComponent } from '@healthcare/charts';
import { LoaderComponent } from '@healthcare/ui';
import { ModuleChartContext } from '../../../../enums/module-chart-context.enum';
import { ModuleValueContext } from '../../../../enums/module-value-context.enum';
import { ModulePrimitive } from '../../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../../models/module-inject.model';
import { Module } from '../../../../models/module.model';
import { ModuleStateService } from '../../../../services/module-state.service';
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
  private readonly module = inject(MODULE);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly moduleState = inject(ModuleStateService);

  private readonly viewType = ModuleChartContext.Details;
  readonly compareModule = input<Module | undefined>(undefined);
  readonly data = input<ModulePrimitive[][] | undefined>(undefined);

  readonly chart = signal<BaseChart | undefined>(undefined);

  ngOnInit(): void {
    const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    if (!patientId) return;

    const preferredUnit = this.module.valueResolver.resolvePreferredUnit(
      ModuleValueContext.Details,
      this.moduleState.preferredUnits,
    );
    const compareModule = this.compareModule();

    // draw compare chart with two modules (main and composite one)
    if (compareModule) {
      const compositePreferredUnit = compareModule.valueResolver.resolvePreferredUnit(
        ModuleValueContext.Details,
        this.moduleState.preferredUnits,
      );
      const chart = createCompositeViewChart(
        this.module,
        compareModule,
        preferredUnit,
        compositePreferredUnit,
      );
      if (chart) this.chart.set(chart);
      return;
    }

    // draw single chart for the main module
    const chart = createViewChart(this.module, this.viewType, preferredUnit);
    if (chart) this.chart.set(chart);
  }
}
