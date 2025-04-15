import { ModulePrimitive } from '@healthcare/core';

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  data: Partial<Record<string, ModulePrimitive>>;
};

export const getRandomBool = () => Boolean(parseInt(Math.random().toFixed()));

export const generatePatient = (index: number): Patient => {
  return {
    id: String(index),
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

export const generateModuleData = (
  index: number,
  moduleId: string,
  moduleConfigId: string,
  valueRange: number[],
): ModulePrimitive => {
  return {
    id: `${index}`,
    moduleId,
    moduleConfigId,
    createDateTime: generateDate(index),
    updateDateTime: generateDate(index),
    direction: Boolean(parseInt(Math.random().toFixed())) ? 'INCREASE' : 'DECREASE',
    value: parseInt((Math.random() * (valueRange[1] - valueRange[0]) + valueRange[0]).toFixed()),
  };
};

export const generateDate = (index: number) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  date.setHours(Math.floor(Math.random() * 23));
  date.setMinutes(Math.floor(Math.random() * 59));
  date.setSeconds(Math.floor(Math.random() * 59));
  return date.toISOString();
};

export const PATIENTS: Patient[] = [
  ...Array.from(Array(30))
    .fill(null)
    .map((v, index) => generatePatient(index)),
];
