import { ModuleValueContext } from '../../enums/module-value-context.enum';
import { ModulePrimitive } from '../../interfaces/module-primitive.interface';
import { ModuleUnit } from '../module-unit.model';
import { Module } from '../module.model';

export const getPreferredUnitDataTransformer = (
  context: ModuleValueContext,
  module?: Module,
  preferredUnit?: ModuleUnit,
) => {
  const unit = module?.valueResolver.resolveUnit(context);
  return (data: unknown[]) =>
    (data as ModulePrimitive[]).map((d) => ({
      ...d,
      value: preferredUnit ? unit?.convertTo(preferredUnit.id, d.value) : d.value,
    }));
};
