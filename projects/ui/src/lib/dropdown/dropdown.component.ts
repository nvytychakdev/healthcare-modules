import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DROPDOWN } from './dropdown.model';

@Component({
  selector: 'lib-dropdown',
  imports: [NgTemplateOutlet],
  providers: [{ provide: DROPDOWN, useExisting: DropdownComponent }],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  readonly isVisible = signal(false);
  readonly dropdown = input.required<TemplateRef<void>>();
  readonly menu = viewChild<ElementRef<HTMLElement>>('menu');
  readonly trigger = viewChild<ElementRef<HTMLElement>>('trigger');

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      this.isVisible() &&
      !this.menu()?.nativeElement.contains(target) &&
      !this.trigger()?.nativeElement.contains(target)
    ) {
      this.isVisible.set(false);
    }
  }

  openDropdown() {
    this.isVisible.set(!this.isVisible());
  }

  onClick(index: number) {
    console.log(index);
  }
}
