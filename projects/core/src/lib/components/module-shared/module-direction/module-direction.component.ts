import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowDownwardOutline, matArrowUpwardOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'lib-module-direction',
  imports: [NgIcon],
  providers: [provideIcons({ matArrowDownwardOutline, matArrowUpwardOutline })],
  templateUrl: './module-direction.component.html',
  styleUrl: './module-direction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDirectionComponent {
  readonly direction = input<'INCREASE' | 'DECREASE'>();
}
