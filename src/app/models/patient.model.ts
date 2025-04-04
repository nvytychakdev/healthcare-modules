import { ModulePrimitive } from '@healthcare/core';

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

const getRandomBool = () => Boolean(parseInt(Math.random().toFixed()));

const generatePatient = (index: number): Patient => {
  return {
    id: index,
    lastName: 'Name',
    firstName: 'Name',
    data: {
      ['Temperature']: getRandomBool()
        ? generateModuleData(1, 'Temperature', '1', [36, 45])
        : undefined,
      ['Weight']: getRandomBool() ? generateModuleData(1, 'Weight', '1', [40, 150]) : undefined,
      ['Symptoms']: getRandomBool() ? generateModuleData(1, 'Symptoms', '1', [36, 45]) : undefined,
      ['BloodPressure']: getRandomBool()
        ? generateModuleData(1, 'BloodPressure', '1', [100, 200])
        : undefined,
    },
  };
};

const generateModuleData = (
  index: number,
  moduleId: string,
  moduleConfigId: string,
  valueRange: number[],
): ModulePrimitive => {
  return {
    id: `${index}`,
    moduleId,
    moduleConfigId,
    createDateTime: new Date().toISOString(),
    updateDateTime: new Date().toISOString(),
    direction: Boolean(parseInt(Math.random().toFixed())) ? 'INCREASE' : 'DECREASE',
    value: parseInt((Math.random() * (valueRange[1] - valueRange[0]) + valueRange[0]).toFixed()),
  };
};

export const PATIENTS: Patient[] = [
  ...Array.from(Array(30))
    .fill(null)
    .map((v, index) => generatePatient(index)),
];
