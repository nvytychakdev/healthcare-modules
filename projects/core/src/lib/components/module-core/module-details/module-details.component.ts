import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabComponent, TabGroupComponent } from '@healthcare/ui';
import { ModuleDetailsChartComponent } from './module details chart/module details chart.component';

@Component({
  selector: 'lib-module-details',
  imports: [TabGroupComponent, TabComponent, ModuleDetailsChartComponent],
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDetailsComponent {}
