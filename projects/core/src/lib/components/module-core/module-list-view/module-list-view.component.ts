import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModuleValueContext } from '../../../enums/module-value-context.enum';
import { MODULE, MODULE_DATA } from '../../../models/module-inject.model';
import { ModuleStateService } from '../../../services/module-state.service';
import { ModuleDirectionComponent } from '../../module-shared/module-direction/module-direction.component';

@Component({
  selector: 'lib-module-list-view',
  imports: [ModuleDirectionComponent],
  templateUrl: './module-list-view.component.html',
  styleUrl: './module-list-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleListViewComponent {
  private readonly moduleState = inject(ModuleStateService);
  readonly module = inject(MODULE);
  readonly data = inject(MODULE_DATA);

  private readonly preferredUnit = this.moduleState.getPreferredUnit(this.module.moduleId);
  readonly record = this.module.valueResolver.resolveRecord(ModuleValueContext.List, this.data);
  readonly unit = this.module.valueResolver.resolveUnit(
    ModuleValueContext.List,
    this.preferredUnit,
  );
  readonly value = computed(() => {
    if (!this.record) return undefined;
    return this.module.valueResolver.resolveValue(ModuleValueContext.List, this.record, this.unit);
  });
}
