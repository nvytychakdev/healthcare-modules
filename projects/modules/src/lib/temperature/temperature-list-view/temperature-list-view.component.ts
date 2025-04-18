import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModuleDirectionComponent, ModuleListViewComponent } from '@healthcare/core';

@Component({
  selector: 'lib-temperature-list-view',
  imports: [ModuleDirectionComponent],
  templateUrl: './temperature-list-view.component.html',
  styleUrl: './temperature-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureListViewComponent extends ModuleListViewComponent {}
