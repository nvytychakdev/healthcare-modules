import { inject, signal } from '@angular/core';
import { finalize, map } from 'rxjs';
import { ModulePrimitive } from '../interfaces/module-primitive.interface';
import { ModuleDataService } from '../services/module-data.service';

export class ModuleDataSource {
  private readonly moduleData = inject(ModuleDataService);

  private readonly _isLoading = signal(false);

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  fetchData(patientId: string, moduleId: string) {
    this._isLoading.set(true);
    return this.moduleData
      .getModuleData(patientId, moduleId)
      .pipe(finalize(() => this._isLoading.set(false)));
  }

  formatData(data: ModulePrimitive[]) {
    return data;
  }

  getData(patientId: string, moduleId: string) {
    return this.fetchData(patientId, moduleId).pipe(map((data) => this.formatData(data)));
  }
}
