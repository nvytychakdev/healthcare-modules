import { ModuleConfig } from '../interfaces/module-config.interface';

export const MODULES_MOCK: ModuleConfig[] = [
  {
    id: '1',
    moduleId: 'Temperature',
    moduleName: 'Temperature',
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    order: 1,
    ragThreshold: [],
    status: 'ENABLED',
  },
  {
    id: '2',
    moduleId: 'Weight',
    moduleName: 'Weight',
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    order: 2,
    ragThreshold: [],
    status: 'ENABLED',
  },
  {
    id: '1',
    moduleId: 'BloodPressure',
    moduleName: 'Blood Pressure',
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    order: 1,
    ragThreshold: [],
    status: 'ENABLED',
  },
  {
    id: '2',
    moduleId: 'Symptoms',
    moduleName: 'Symptoms',
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    order: 2,
    ragThreshold: [],
    status: 'ENABLED',
  },
];
