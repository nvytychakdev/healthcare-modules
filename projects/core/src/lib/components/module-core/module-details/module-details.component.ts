import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabComponent, TabGroupComponent } from '@healthcare/ui';
import { ChartComponent } from '../../../../../../charts/src/lib/components/chart/chart.component';
import { ModuleDetailsChartComponent } from './module details chart/module details chart.component';

@Component({
  selector: 'lib-module-details',
  imports: [TabGroupComponent, TabComponent, ChartComponent, ModuleDetailsChartComponent],
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDetailsComponent {}
