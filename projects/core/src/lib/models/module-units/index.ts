import { ModuleUnit } from '../module-unit.model';

export const MODULE_UNITS = {
  temperature: new Map<string, ModuleUnit>()
    .set(
      'celsius',
      new ModuleUnit('Celsius', '°C')
        .withConvertor('kelvin', (value: number) => value + 273.15)
        .withConvertor('fahrenheit', (value: number) => (value * 9) / 5 + 32),
    )
    .set(
      'kelvin',
      new ModuleUnit('Kelvin', 'K')
        .withConvertor('celsius', (value: number) => value - 273.15)
        .withConvertor('fahrenheit', (value: number) => ((value - 273.15) * 9) / 5 + 32),
    )
    .set(
      'fahrenheit',
      new ModuleUnit('Fahrenheit', '°F')
        .withConvertor('celsius', (value: number) => ((value - 32) * 5) / 9)
        .withConvertor('kelvin', (value: number) => ((value - 32) * 5) / 9 + 273.15),
    ),

  weight: new Map<string, ModuleUnit>()
    .set(
      'kg',
      new ModuleUnit('Kilogram', 'kg')
        .withConvertor('lb', (value: number) => value * 2.20462)
        .withConvertor('st', (value: number) => value / 6.35029),
    )
    .set(
      'lb',
      new ModuleUnit('Pound', 'lb')
        .withConvertor('kg', (value: number) => value / 2.20462)
        .withConvertor('st', (value: number) => value / 14),
    )
    .set(
      'st',
      new ModuleUnit('Stone', 'st')
        .withConvertor('kg', (value: number) => value * 6.35029)
        .withConvertor('lb', (value: number) => value * 14),
    ),
};
