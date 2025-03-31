import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { ModuleChartContext } from '@healthcare/core';
import { ModuleRenderer } from '../../../../../projects/core/src/lib/models/module-renderer.model';

@Component({
  selector: 'app-patient-overview-module',
  imports: [],
  templateUrl: './patient-overview-module.component.html',
  styleUrl: './patient-overview-module.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientOverviewModuleComponent extends ModuleRenderer {
  readonly viewType = ModuleChartContext.Overview;

  ngOnInit() {
    this.module()
      .view.getChartRenderers(this.viewType)
      ?.createChart({} as HTMLElement, this.viewType);
  }

  override getRenderComponent(): Type<unknown> {
    return this.module().view.overview;
  }
}
