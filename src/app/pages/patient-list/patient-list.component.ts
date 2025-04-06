import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleRegistryService } from '@healthcare/core';
import { Patient, PATIENTS } from '../../models/patient.model';
import { PatientListModuleComponent } from './patient-list-module/patient-list-module.component';

@Component({
  selector: 'app-patient-list',
  imports: [PatientListModuleComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListComponent {
  private readonly router = inject(Router);
  readonly registry = inject(ModuleRegistryService);

  patients: Patient[] = PATIENTS;

  patientClick(patient: Patient) {
    void this.router.navigate(['patients', patient.id, 'overview']);
  }
}
