import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabComponent, TabGroupComponent } from '@healthcare/ui';

@Component({
  selector: 'lib-module-details',
  imports: [TabGroupComponent, TabComponent],
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDetailsComponent {}
