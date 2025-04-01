import { Root } from '@amcharts/amcharts5';
import { AfterViewInit, Directive, inject, NgZone, OnDestroy } from '@angular/core';

@Directive()
export abstract class ChartLifecycle implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);

  protected root?: Root;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initializeChart();
    });
  }

  ngOnDestroy(): void {
    this.disposeChart();
  }

  protected disposeChart() {
    this.root?.dispose();
  }

  abstract initializeChart(): void;
}
