import { UnitResolverFn } from '../../interfaces/module-value-resolver.interface';

export const UNIT_RESOLVER_DEFAULT_FN: UnitResolverFn = function (context, preferredUnit) {
  if (preferredUnit) return this.units.get(preferredUnit);
  return this.units.values().next().value;
};
