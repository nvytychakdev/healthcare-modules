import { ModuleValueContext } from '../../enums/module-value-context.enum';
import { ModulePrimitive } from '../../interfaces/module-primitive.interface';
import { ModuleUnit } from '../module-unit.model';
import { Module } from '../module.model';

type ModuleTransformerFn = (
  context: ModuleValueContext,
  module?: Module,
  preferredUnit?: ModuleUnit,
) => (data: unknown[]) => ModulePrimitive[];

export const getPreferredUnitDataTransformer: ModuleTransformerFn = (
  context: ModuleValueContext,
  module?: Module,
  preferredUnit?: ModuleUnit,
) => {
  const unit = module?.valueResolver.resolveUnit(context);
  return (data: unknown[]) =>
    (data as ModulePrimitive[]).map((d) => ({
      ...d,
      value: unit && preferredUnit ? unit?.convertTo(preferredUnit.id, d.value) : d.value,
    }));
};
