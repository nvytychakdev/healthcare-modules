import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ModuleValueContext } from '../../../enums/module-value-context.enum';
import { MODULE, MODULE_DATA } from '../../../models/module-inject.model';
import { ModuleStateService } from '../../../services/module-state.service';
import { ModuleDirectionComponent } from '../../module-shared/module-direction/module-direction.component';

@Component({
  selector: 'lib-module-card',
  imports: [ModuleDirectionComponent],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleCardComponent {
  private readonly moduleState = inject(ModuleStateService);
  readonly module = inject(MODULE);
  readonly data = inject(MODULE_DATA);

  readonly isSelected = computed(() => this.module === this.moduleState.selectedModule());

  readonly record = this.module.valueResolver.resolveRecord(ModuleValueContext.Card, this.data);
  readonly preferredUnit = this.moduleState.getPreferredUnit(this.module.moduleId);
  readonly unit = this.module.valueResolver.resolveUnit(
    ModuleValueContext.Card,
    this.preferredUnit,
  );

  readonly value = computed(() => {
    if (!this.record) return undefined;
    return this.module.valueResolver.resolveValue(ModuleValueContext.Card, this.record, this.unit);
  });
}
