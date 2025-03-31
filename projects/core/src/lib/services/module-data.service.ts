import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { MODULE_DATA_MOCK } from '../mock/module-data.mock';
import { MODULES_MOCK } from '../mock/module.mock';

const DELAY_TIME = 1500;

@Injectable({
  providedIn: 'root',
})
export class ModuleDataService {
  getModule(id: string) {
    const module = MODULES_MOCK.find((module) => module.id === id);
    return of(module).pipe(delay(DELAY_TIME));
  }

  getModuleData(patientId: string, moduleId: string) {
    const data = MODULE_DATA_MOCK[moduleId];
    return of(data).pipe(delay(DELAY_TIME));
  }
}
