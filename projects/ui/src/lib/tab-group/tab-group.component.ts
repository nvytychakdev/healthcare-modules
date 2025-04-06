import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  linkedSignal,
} from '@angular/core';
import { TabNavComponent } from './tab-nav/tab-nav.component';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'lib-tab-group',
  imports: [TabNavComponent, NgTemplateOutlet],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent {
  readonly tabs = contentChildren(TabComponent);
  readonly selectedIndex = input(0);

  readonly selectedTabIndex = linkedSignal({
    source: this.selectedIndex,
    computation: (source) => source,
  });
  readonly selectedTab = computed(() => {
    return this.tabs().at(this.selectedTabIndex());
  });

  selectTabByIndex(index: number) {
    this.selectedTabIndex.set(index);
  }
}
