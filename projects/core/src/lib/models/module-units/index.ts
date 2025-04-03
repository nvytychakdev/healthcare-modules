import { ModuleUnit } from '../module-unit.model';

export const MODULE_UNITS = {
  temperature: new Map()
    .set(
      'celsius',
      new ModuleUnit('Celsius', '°C').withConvertor('kelvin', (value: number) => value + 273.15),
    )
    .set(
      'kelvin',
      new ModuleUnit('Kelvin', 'K').withConvertor('celsius', (value: number) => value - 273.15),
    ),
  weight: new Map().set('kg', new ModuleUnit('Kilogram', 'kg')),
};
