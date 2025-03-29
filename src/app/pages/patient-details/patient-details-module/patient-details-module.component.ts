import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ModuleDetailsComponent, ModuleRenderer } from '@healthcare/core';

@Component({
  selector: 'app-patient-details-module',
  imports: [],
  templateUrl: './patient-details-module.component.html',
  styleUrl: './patient-details-module.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsModuleComponent extends ModuleRenderer {
  override getRenderComponent(): Type<unknown> {
    return ModuleDetailsComponent;
  }
}
