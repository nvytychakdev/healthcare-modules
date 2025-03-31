import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MODULE, MODULE_DATA, ModuleDirectionComponent } from '@healthcare/core';

@Component({
  selector: 'lib-temperature-list-view',
  imports: [ModuleDirectionComponent],
  templateUrl: './temperature-list-view.component.html',
  styleUrl: './temperature-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureListViewComponent {
  readonly module = inject(MODULE);
  readonly data = inject(MODULE_DATA);
}
