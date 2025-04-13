import {
  ChangeDetectionStrategy,
  Component,
  input,
  Provider,
  StaticProvider,
  Type,
} from '@angular/core';
import { MODULE_DATA, ModuleRenderer } from '@healthcare/core';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-card-module',
  imports: [],
  templateUrl: './patient-card-module.component.html',
  styleUrl: './patient-card-module.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientCardModuleComponent extends ModuleRenderer {
  readonly data = input.required<Patient['data'] | undefined>();

  override getRenderComponent(): Type<unknown> {
    return this.module().view.cardView;
  }

  override createProviders(): Array<Provider | StaticProvider> {
    return [{ provide: MODULE_DATA, useValue: this.data() }];
  }
}
