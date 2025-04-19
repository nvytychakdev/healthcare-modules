import { inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ModuleDataTransformer } from '../interfaces/module-data.inteface';
import { ModuleDataService } from '../services/module-data.service';
import { Module } from './module.model';

export class ModuleDataSource {
  private readonly moduleData = inject(ModuleDataService);

  protected moduleRef?: Module;
  private readonly _dataTransformers: OmitThisParameter<ModuleDataTransformer>[] = [];
  private readonly _isLoading = signal(false);

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  get dataTransformers(): ReadonlyArray<OmitThisParameter<ModuleDataTransformer>> {
    return this._dataTransformers;
  }

  withModule(module: Module) {
    this.moduleRef = module;
    return this;
  }

  withDataTransformer(transformer: ModuleDataTransformer) {
    this._dataTransformers.push(transformer.bind(this));
    return this;
  }

  getData(patientId: string, moduleId: string) {
    this._isLoading.set(true);
    return this.moduleData
      .getModuleData(patientId, moduleId)
      .pipe(finalize(() => this._isLoading.set(false)));
  }
}
