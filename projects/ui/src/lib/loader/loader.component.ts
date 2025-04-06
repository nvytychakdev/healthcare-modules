import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
