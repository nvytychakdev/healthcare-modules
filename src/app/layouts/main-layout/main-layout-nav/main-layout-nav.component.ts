import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from '@healthcare/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matBusinessOutline,
  matHomeOutline,
  matKeyboardArrowUpOutline,
  matSettingsOutline,
  matViewColumnOutline,
} from '@ng-icons/material-icons/outline';
import { DropdownItemDirective } from '../../../../../projects/ui/src/lib/dropdown/dropdown-item.directive';
import { NAVIGATION_OPTIONS } from '../../../const/navigation-options.const';

@Component({
  selector: 'app-main-layout-nav',
  imports: [RouterLink, RouterLinkActive, NgIcon, DropdownComponent, DropdownItemDirective],
  providers: [
    provideIcons({
      matHomeOutline,
      matBusinessOutline,
      matSettingsOutline,
      matViewColumnOutline,
      matKeyboardArrowUpOutline,
    }),
  ],
  templateUrl: './main-layout-nav.component.html',
  styleUrl: './main-layout-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutNavComponent {
  readonly navOptions = NAVIGATION_OPTIONS;
  private readonly router = inject(Router);

  openProfileSettings() {
    void this.router.navigate(['/profile/settings']);
  }
}
