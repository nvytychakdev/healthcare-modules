import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Module } from '../../models/module.model';

@Component({
  selector: 'lib-module-overview-card',
  imports: [],
  templateUrl: './module-overview-card.component.html',
  styleUrl: './module-overview-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleOverviewCardComponent {
  readonly module = inject(Module);
  readonly data = signal<unknown[] | null>(null);

  ngOnInit() {
    this.module.dataSource.getData(this.module.id).subscribe((data) => this.data.set(data));
  }
}
