import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutNavComponent } from './main-layout-nav/main-layout-nav.component';

@Component({
  selector: 'app-main-layout',
  imports: [MainLayoutNavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
