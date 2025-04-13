import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Module, ModuleRegistryService } from '@healthcare/core';
import { map } from 'rxjs';
import { PATIENTS } from '../../models/patient.model';
import { PatientCardModuleComponent } from './patient-card-module/patient-card-module.component';
import { PatientDetailsModuleComponent } from './patient-details-module/patient-details-module.component';

@Component({
  selector: 'app-patient-details',
  imports: [PatientDetailsModuleComponent, PatientCardModuleComponent],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly registry = inject(ModuleRegistryService);

  readonly patient = PATIENTS.find(
    (p) => p.id === this.activatedRoute.snapshot.paramMap.get('patientId'),
  );

  readonly moduleId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['moduleId'])),
  );
  readonly selectedModule = computed<Module | undefined>(() => {
    const moduleId = this.moduleId();
    return this.registry.modules().find((m) => m.id === moduleId);
  });

  selectModule(module: Module) {
    void this.router.navigate(['..', module.id], { relativeTo: this.activatedRoute });
  }
}
