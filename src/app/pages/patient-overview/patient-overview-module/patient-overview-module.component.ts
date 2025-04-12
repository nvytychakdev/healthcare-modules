import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ModuleRenderer } from '@healthcare/core';

@Component({
  selector: 'app-patient-overview-module',
  imports: [],
  templateUrl: './patient-overview-module.component.html',
  styleUrl: './patient-overview-module.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientOverviewModuleComponent extends ModuleRenderer {
  override getRenderComponent(): Type<unknown> {
    return this.module().view.overview;
  }
}
