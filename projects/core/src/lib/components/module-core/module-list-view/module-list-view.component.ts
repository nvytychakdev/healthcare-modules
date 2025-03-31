import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MODULE, MODULE_DATA } from '../../../models/module-inject.model';
import { ModuleDirectionComponent } from '../../module-shared/module-direction/module-direction.component';

@Component({
  selector: 'lib-module-list-view',
  imports: [ModuleDirectionComponent],
  templateUrl: './module-list-view.component.html',
  styleUrl: './module-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleListViewComponent {
  readonly module = inject(MODULE);
  readonly data = inject(MODULE_DATA);
}
