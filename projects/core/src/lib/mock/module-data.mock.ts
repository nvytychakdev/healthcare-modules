import { generateModuleData } from '../../../../../src/app/models/patient.model';
import { ModulePrimitive } from '../interfaces/module-primitive.interface';

export const MODULE_DATA_TEMPERATURE_MOCK: ModulePrimitive[] = [
  ...Array.from(Array(30))
    .fill(null)
    .map((v, index) => generateModuleData(index, 'Temperature', '1', [36, 45])),
];

export const MODULE_DATA_WEIGHT_MOCK: ModulePrimitive[] = [
  ...Array.from(Array(30))
    .fill(null)
    .map((v, index) => generateModuleData(index, 'Weight', '2', [40, 150])),
];

export const MODULE_DATA_MOCK: Record<string, ModulePrimitive[]> = {
  ['Temperature']: MODULE_DATA_TEMPERATURE_MOCK,
  ['Weight']: MODULE_DATA_WEIGHT_MOCK,
};
