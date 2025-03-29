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
      ['Temperature']: {
        value: 37,
        direction: 'INCREASE',
      },
    },
  },
  {
    id: 2,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Temperature']: {
        value: 39.5,
        direction: 'INCREASE',
      },
    },
  },
  {
    id: 3,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Weight']: {
        value: 80,
      },
    },
  },
  {
    id: 4,
    firstName: 'Test',
    lastName: 'Test',
    data: {
      ['Temperature']: {
        value: 36.6,
      },
      ['Weight']: {
        value: 73,
        direction: 'DECREASE',
      },
    },
  },
];
