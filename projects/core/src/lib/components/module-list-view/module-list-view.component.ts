import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowDownwardOutline, matArrowUpwardOutline } from '@ng-icons/material-icons/outline';
import { MODULE_DATA } from '../../models/module-data-source.model';
import { Module } from '../../models/module.model';

@Component({
  selector: 'lib-module-list-view',
  imports: [NgIcon],
  providers: [provideIcons({ matArrowDownwardOutline, matArrowUpwardOutline })],
  templateUrl: './module-list-view.component.html',
  styleUrl: './module-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleListViewComponent {
  readonly module = inject(Module);
  readonly data = inject(MODULE_DATA);
}
