import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModulePrimitive } from '../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../models/module-inject.model';
import { ModuleDirectionComponent } from '../../module-shared/module-direction/module-direction.component';

@Component({
  selector: 'lib-module-overview-card',
  imports: [DatePipe, ModuleDirectionComponent],
  templateUrl: './module-overview-card.component.html',
  styleUrl: './module-overview-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleOverviewCardComponent {
  private readonly route = inject(ActivatedRoute);
  readonly module = inject(MODULE);
  readonly data = signal<ModulePrimitive[] | null>(null);

  readonly latestRecord = computed(() => this.data()?.at(-1));
  readonly latestRecordValue = computed(() => this.latestRecord()?.value);
  readonly latestRecordDirection = computed(() => this.latestRecord()?.direction);
  readonly latestRecordDate = computed(() => this.latestRecord()?.craeteDateTime);

  ngOnInit() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (!patientId) return;

    this.module.dataSource
      .getData(patientId, this.module.moduleId)
      .subscribe((data) => this.data.set(data));
  }
}
