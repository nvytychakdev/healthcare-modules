import { ModuleValueContext } from '../enums/module-value-context.enum';
import { ModuleDataSource } from '../models/module-data-source.model';
import { ModuleUnit } from '../models/module-unit.model';
import { ModulePrimitive } from './module-primitive.interface';

export type ModuleData = ModulePrimitive[] | Record<string, ModulePrimitive>;

type ModuleDataTransformerFn = (data: unknown[]) => ModulePrimitive[];
export type ModuleDataTransformer = (
  this: ModuleDataSource,
  context: ModuleValueContext,
  preferredUnit?: ModuleUnit,
) => ModuleDataTransformerFn;
