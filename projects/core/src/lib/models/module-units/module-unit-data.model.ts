import { ModuleUnit } from '../module-unit.model';

export const MODULE_UNITS = {
  temperature: new Map<string, ModuleUnit>()
    .set(
      'celsius',
      new ModuleUnit('celsius', 'Celsius', '°C')
        .withConvertor('kelvin', (value: number) => value + 273.15)
        .withConvertor('fahrenheit', (value: number) => (value * 9) / 5 + 32),
    )
    .set(
      'kelvin',
      new ModuleUnit('kelvin', 'Kelvin', 'K')
        .withConvertor('celsius', (value: number) => value - 273.15)
        .withConvertor('fahrenheit', (value: number) => ((value - 273.15) * 9) / 5 + 32),
    )
    .set(
      'fahrenheit',
      new ModuleUnit('fahrenheit', 'Fahrenheit', '°F')
        .withConvertor('celsius', (value: number) => ((value - 32) * 5) / 9)
        .withConvertor('kelvin', (value: number) => ((value - 32) * 5) / 9 + 273.15),
    ),

  weight: new Map<string, ModuleUnit>()
    .set(
      'kg',
      new ModuleUnit('kg', 'Kilogram', 'kg')
        .withConvertor('lb', (value: number) => value * 2.20462)
        .withConvertor('st', (value: number) => value / 6.35029)
        .withFormatter((value) => value.toFixed(2)),
    )
    .set(
      'lb',
      new ModuleUnit('lb', 'Pound', 'lb')
        .withConvertor('kg', (value: number) => value / 2.20462)
        .withConvertor('st', (value: number) => value / 14)
        .withFormatter((value) => value.toFixed(2)),
    )
    .set(
      'st',
      new ModuleUnit('st', 'Stone', 'st')
        .withConvertor('kg', (value: number) => value * 6.35029)
        .withConvertor('lb', (value: number) => value * 14)
        .withFormatter((value) => value.toFixed(2)),
    ),
};
