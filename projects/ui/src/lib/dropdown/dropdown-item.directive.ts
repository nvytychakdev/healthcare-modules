import { Directive, HostListener, inject } from '@angular/core';
import { DROPDOWN } from './dropdown.model';

@Directive({
  selector: '[lib-dropdown-item]',
  host: {
    class:
      'block w-full text-left cursor-pointer rounded-md px-4 py-2 text-sm text-zinc-50 hover:bg-blue-500',
    role: 'menuitem',
    tabindex: '-1',
  },
})
export class DropdownItemDirective {
  private dropdown = inject(DROPDOWN);

  @HostListener('click', ['$event']) onClick($event: Event) {
    this.dropdown.isVisible.set(false);
  }
}
