import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-layout-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-layout-nav.component.html',
  styleUrl: './main-layout-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutNavComponent {}
