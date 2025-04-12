import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent, TabGroupComponent } from '@healthcare/ui';
import { combineLatest } from 'rxjs';
import { ModulePrimitive } from '../../../interfaces/module-primitive.interface';
import { MODULE } from '../../../models/module-inject.model';
import { Module } from '../../../models/module.model';
import { ModuleRegistryService } from '../../../services/module-registry.service';
import { ModuleDetailsChartComponent } from './module details chart/module details chart.component';

@Component({
  selector: 'lib-module-details',
  imports: [TabGroupComponent, TabComponent, ModuleDetailsChartComponent],
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleDetailsComponent implements OnInit {
  private readonly modulesRegistry = inject(ModuleRegistryService);
  private readonly module = inject(MODULE);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly compareModule = signal<Module | undefined>(undefined);
  readonly data = signal<ModulePrimitive[][] | undefined>(undefined);

  ngOnInit(): void {
    const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!patientId) return;

    const compareModule = this.modulesRegistry.modules().at(1);
    if (compareModule) {
      this.compareModule.set(compareModule);

      combineLatest([
        this.module.dataSource.getData(patientId, this.module.moduleId),
        compareModule.dataSource.getData(patientId, compareModule.moduleId),
      ]).subscribe((data) => this.data.set(data));
    } else {
      this.module.dataSource
        .getData(patientId, this.module.moduleId)
        .subscribe((data) => this.data.set([data]));
    }
  }
}
