import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module, ModuleRegistryService } from '@healthcare/core';
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
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  openDetails(module: Module) {
    void this.router.navigate(['../details', module.id], { relativeTo: this.activatedRoute });
  }
}
