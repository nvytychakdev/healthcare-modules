import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { MODULE_DATA } from '../mock/module-data.mock';
import { MODULES } from '../mock/module.mock';

const DELAY_TIME = 1500;

@Injectable({
  providedIn: 'root',
})
export class ModuleDataService {
  getModule(id: string) {
    const module = MODULES.find((module) => module.id === id);
    return of(module).pipe(delay(DELAY_TIME));
  }

  getModuleData(id: string) {
    const data = MODULE_DATA[id];
    return of(data).pipe(delay(DELAY_TIME));
  }
}
