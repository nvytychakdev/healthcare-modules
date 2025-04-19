import {
  PreferredUnitResolverFn,
  UnitResolverFn,
} from '../../interfaces/module-value-resolver.interface';

export const UNIT_RESOLVER_DEFAULT_FN: UnitResolverFn = function (context, preferredUnit) {
  if (preferredUnit) return this.units.get(preferredUnit);
  return this.units.values().next().value;
};

export const PREFERRED_UNIT_RESOLVER_DEFAULT_FN: PreferredUnitResolverFn = function (
  context,
  preferredUnits: ReadonlyMap<string, string>,
) {
  if (!this._moduleRef) return undefined;

  const preferredUnit = preferredUnits.get(this._moduleRef.moduleId);
  if (!preferredUnit) return undefined;

  return this._moduleRef?.valueResolver.resolveUnit(context, preferredUnit);
};
