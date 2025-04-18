import { ModuleValueContext } from '../enums/module-value-context.enum';
import { ModuleUnit } from '../models/module-unit.model';
import { ModuleValueResolver } from '../models/module-value-resolver.model';
import { ModulePrimitive } from './module-primitive.interface';

export type ValueResolverFn = (
  this: ModuleValueResolver,
  context: ModuleValueContext,
  data: ModulePrimitive,
  preferredUnit?: ModuleUnit,
) => string | undefined;

export type UnitResolverFn = (
  this: ModuleValueResolver,
  context: ModuleValueContext,
  preferredUnit?: string,
) => ModuleUnit | undefined;

export type RecordResolverFn = (
  this: ModuleValueResolver,
  context: ModuleValueContext,
  data: Record<string, ModulePrimitive> | ModulePrimitive[],
) => ModulePrimitive | undefined;
