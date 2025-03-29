import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModuleRegistryService } from '../../../../projects/core/src/lib/services/module-registry.service';
import { PatientOverviewModuleComponent } from './patient-overview-module/patient-overview-module.component';

@Component({
  selector: 'app-patient-overview',
  imports: [PatientOverviewModuleComponent],
  templateUrl: './patient-overview.component.html',
  styleUrl: './patient-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientOverviewComponent {
  readonly registry = inject(ModuleRegistryService);
}
