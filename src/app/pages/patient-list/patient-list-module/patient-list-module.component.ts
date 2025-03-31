import {
  ChangeDetectionStrategy,
  Component,
  input,
  Provider,
  StaticProvider,
  Type,
} from '@angular/core';
import { MODULE_DATA } from '@healthcare/core';
import { ModuleRenderer } from '../../../../../projects/core/src/lib/models/module-renderer.model';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-list-module',
  imports: [],
  templateUrl: './patient-list-module.component.html',
  styleUrl: './patient-list-module.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListModuleComponent extends ModuleRenderer {
  readonly data = input.required<Patient['data']>();

  override getRenderComponent(): Type<unknown> {
    return this.module().view.listView;
  }

  override createProviders(): Array<Provider | StaticProvider> {
    return [{ provide: MODULE_DATA, useValue: this.data() }];
  }
}
