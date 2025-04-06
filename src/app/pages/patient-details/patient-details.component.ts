import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module, ModuleRegistryService } from '@healthcare/core';
import { PatientDetailsModuleComponent } from './patient-details-module/patient-details-module.component';

@Component({
  selector: 'app-patient-details',
  imports: [PatientDetailsModuleComponent],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly registry = inject(ModuleRegistryService);

  readonly selectedModule = computed<Module | undefined>(() => {
    const moduleId = this.activatedRoute.snapshot.paramMap.get('moduleId');
    return this.registry.modules().find((m) => m.id === moduleId);
  });
}
