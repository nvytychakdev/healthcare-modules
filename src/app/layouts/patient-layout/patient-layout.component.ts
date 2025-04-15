import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LayoutSectionComponent } from '../../components/layout-section/layout-section.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { PATIENTS } from '../../models/patient.model';

@Component({
  selector: 'app-patient-layout',
  imports: [RouterOutlet, LayoutSectionComponent, ProfileCardComponent],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientLayoutComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly patient = PATIENTS.find(
    (p) => p.id === this.activatedRoute.snapshot.paramMap.get('patientId'),
  );
}
