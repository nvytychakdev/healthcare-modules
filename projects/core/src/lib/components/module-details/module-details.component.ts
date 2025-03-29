import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-module-details',
  imports: [],
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDetailsComponent {}
