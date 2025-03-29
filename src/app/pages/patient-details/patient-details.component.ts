import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  imports: [],
  template: `
    <p>patient-details works!</p>
  `,
  styleUrl: './patient-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent {}
