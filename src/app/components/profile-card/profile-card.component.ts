import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matContactEmergencyOutline,
  matEmailOutline,
  matFmdGoodOutline,
  matPhoneOutline,
} from '@ng-icons/material-icons/outline';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-profile-card',
  imports: [NgIcon],
  providers: [
    provideIcons({
      matPhoneOutline,
      matEmailOutline,
      matFmdGoodOutline,
      matContactEmergencyOutline,
    }),
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly patient = input.required<Patient>();
}
