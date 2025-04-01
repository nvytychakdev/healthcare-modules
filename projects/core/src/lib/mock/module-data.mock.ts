import { ModulePrimitive } from '../interfaces/module-primitive.interface';

export const MODULE_DATA_TEMPERATURE_MOCK: ModulePrimitive[] = [
  {
    id: '1',
    moduleId: 'Temperature',
    moduleConfigId: '1',
    createDateTime: '2025-01-01T17:44:39.628Z',
    updateDateTime: '2025-01-01T17:44:39.628Z',
    value: 36.6,
  },
  {
    id: '2',
    moduleId: 'Temperature',
    moduleConfigId: '1',
    createDateTime: '2025-02-01T17:44:39.628Z',
    updateDateTime: '2025-02-01T17:44:39.628Z',
    value: 36.6,
  },
  {
    id: '3',
    moduleId: 'Temperature',
    moduleConfigId: '1',
    createDateTime: '2025-03-01T17:44:39.628Z',
    updateDateTime: '2025-03-01T17:44:39.628Z',
    value: 37.3,
    direction: 'INCREASE',
  },
];

export const MODULE_DATA_WEIGHT_MOCK: ModulePrimitive[] = [
  {
    id: '1',
    moduleId: 'Weight',
    moduleConfigId: '2',
    createDateTime: '2025-01-01T17:44:39.628Z',
    updateDateTime: '2025-01-01T17:44:39.628Z',
    value: 75,
  },
  {
    id: '2',
    moduleId: 'Weight',
    moduleConfigId: '2',
    createDateTime: '2025-02-01T17:44:39.628Z',
    updateDateTime: '2025-02-01T17:44:39.628Z',
    value: 80,
    direction: 'INCREASE',
  },
  {
    id: '3',
    moduleId: 'Weight',
    moduleConfigId: '2',
    createDateTime: '2025-03-01T17:44:39.628Z',
    updateDateTime: '2025-03-01T17:44:39.628Z',
    value: 78,
    direction: 'DECREASE',
  },
];

export const MODULE_DATA_MOCK: Record<string, ModulePrimitive[]> = {
  ['Temperature']: MODULE_DATA_TEMPERATURE_MOCK,
  ['Weight']: MODULE_DATA_WEIGHT_MOCK,
};
