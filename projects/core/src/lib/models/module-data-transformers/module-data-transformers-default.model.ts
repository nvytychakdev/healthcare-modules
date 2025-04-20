import { ModuleValueContext } from '../../enums/module-value-context.enum';
import { ModuleDataTransformer } from '../../interfaces/module-data.inteface';
import { ModulePrimitive } from '../../interfaces/module-primitive.interface';
import { ModuleUnit } from '../module-unit.model';

export const PREFERRED_UNIT_DATA_TRANSFORMER_FN: ModuleDataTransformer = function (
  context: ModuleValueContext,
  preferredUnit?: ModuleUnit,
) {
  const unit = this.moduleRef?.valueResolver.resolveUnit(context);
  const hasUnit = unit && preferredUnit && unit.id !== preferredUnit.id;
  return (data: unknown[]) =>
    (data as ModulePrimitive[]).map((d) => ({
      ...d,
      value: hasUnit ? unit?.convertTo(preferredUnit.id, d.value) : d.value,
    }));
};
