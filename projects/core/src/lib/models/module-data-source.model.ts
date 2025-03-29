import { inject, InjectionToken, signal } from '@angular/core';
import { finalize, map } from 'rxjs';
import { Patient } from '../../../../../src/app/models/patient.model';
import { ModuleDataService } from '../services/module-data.service';

export const MODULE_DATA = new InjectionToken<Patient['data']>('MODULE_DATA');

export class ModuleDataSource {
  private readonly moduleData = inject(ModuleDataService);

  private readonly _isLoading = signal(false);

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  fetchData(id: string) {
    this._isLoading.set(true);
    return this.moduleData.getModuleData(id).pipe(finalize(() => this._isLoading.set(false)));
  }

  formatData(data: unknown[]) {
    return data;
  }

  getData(id: string) {
    return this.fetchData(id).pipe(map((data) => this.formatData(data)));
  }
}
