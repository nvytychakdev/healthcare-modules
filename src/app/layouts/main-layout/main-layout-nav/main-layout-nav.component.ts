import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matBusinessOutline,
  matHomeOutline,
  matSettingsOutline,
  matViewColumnOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-main-layout-nav',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [
    provideIcons({ matHomeOutline, matBusinessOutline, matSettingsOutline, matViewColumnOutline }),
  ],
  templateUrl: './main-layout-nav.component.html',
  styleUrl: './main-layout-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutNavComponent {
  navOptions = [
    { title: 'Patients', link: '/patients', icon: 'matHomeOutline', options: { exact: false } },
    {
      title: 'Organizations',
      link: '/organizations',
      icon: 'matBusinessOutline',
      options: { exact: false },
    },
    {
      title: 'Views',
      link: '/views',
      icon: 'matViewColumnOutline',
      options: { exact: false },
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: 'matSettingsOutline',
      options: { exact: false },
    },
  ];
}
