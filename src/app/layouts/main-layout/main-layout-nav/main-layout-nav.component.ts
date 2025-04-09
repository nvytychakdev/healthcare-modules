import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matBusinessOutline,
  matHomeOutline,
  matSettingsOutline,
  matViewColumnOutline,
} from '@ng-icons/material-icons/outline';
import { NAVIGATION_OPTIONS } from '../../../const/navigation-options.const';

@Component({
  selector: 'app-main-layout-nav',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [
    provideIcons({
      matHomeOutline,
      matBusinessOutline,
      matSettingsOutline,
      matViewColumnOutline,
    }),
  ],
  templateUrl: './main-layout-nav.component.html',
  styleUrl: './main-layout-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutNavComponent {
  readonly navOptions = NAVIGATION_OPTIONS;
}
