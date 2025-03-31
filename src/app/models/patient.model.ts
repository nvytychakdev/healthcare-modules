import {
  MODULE_DATA_TEMPERATURE_MOCK,
  MODULE_DATA_WEIGHT_MOCK,
} from '../../../projects/core/src/lib/mock/module-data.mock';

export type PatientData = {
  value: number | string;
  direction?: 'INCREASE' | 'DECREASE';
};

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  data: Partial<Record<string, PatientData>>;
};

export const PATIENTS: Patient[] = [
  {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Temperature']: MODULE_DATA_TEMPERATURE_MOCK.at(-1),
    },
  },
  {
    id: 2,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Temperature']: MODULE_DATA_TEMPERATURE_MOCK.at(-1),
    },
  },
  {
    id: 3,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Weight']: MODULE_DATA_WEIGHT_MOCK.at(-1),
    },
  },
  {
    id: 4,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Temperature']: MODULE_DATA_TEMPERATURE_MOCK.at(-1),
      ['Weight']: MODULE_DATA_WEIGHT_MOCK.at(-1),
    },
  },
];
