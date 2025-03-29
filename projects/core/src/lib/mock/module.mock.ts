import { ModuleConfig } from '../interfaces/module-config.interface';

export const MODULES: ModuleConfig[] = [
  {
    id: '1',
    moduleId: 'Temperature',
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    order: 1,
    ragThreshold: [],
    status: 'ENABLED',
  },
  {
    id: '2',
    moduleId: 'Weight',
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    order: 2,
    ragThreshold: [],
    status: 'ENABLED',
  },
];
