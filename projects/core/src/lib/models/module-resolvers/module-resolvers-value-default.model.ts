import { ValueResolverFn } from '../../interfaces/module-value-resolver.interface';

export const VALUE_RESOLVER_DEFAULT_FN: ValueResolverFn = function (context, data, preferredUnit) {
  const unit = this.resolveUnit(context);

  if (!data) return undefined;

  // do not format value in case its missing or unit was not provided
  if (!unit || data.value === undefined) return String(data.value);

  // get base formatting in case preferred unit is missing or preferred matches original unit
  if (!preferredUnit || preferredUnit.id === unit.id) {
    return unit.format(data.value);
  }

  // convert to preferred unit and format as it required by the unit
  const convertedValue = unit.convertTo(preferredUnit.id, data.value);
  return preferredUnit.format(convertedValue);
};
