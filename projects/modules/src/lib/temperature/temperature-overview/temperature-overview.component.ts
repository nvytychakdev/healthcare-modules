import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from '@healthcare/charts';
import { ModuleDirectionComponent, ModuleOverviewCardComponent } from '@healthcare/core';
import { LoaderComponent } from '@healthcare/ui';

@Component({
  selector: 'lib-temperature-overview',
  imports: [ModuleDirectionComponent, DatePipe, ChartComponent, LoaderComponent],
  templateUrl: './temperature-overview.component.html',
  styleUrl: './temperature-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureOverviewComponent extends ModuleOverviewCardComponent {}
