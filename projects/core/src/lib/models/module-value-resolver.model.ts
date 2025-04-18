import { ModuleValueContext } from '../enums/module-value-context.enum';
import { ModuleData } from '../interfaces/module-data.inteface';
import { ModulePrimitive } from '../interfaces/module-primitive.interface';
import {
  RecordResolverFn,
  UnitResolverFn,
  ValueResolverFn,
} from '../interfaces/module-value-resolver.interface';
import { RECORD_RESOLVER_DEFAULT_FN } from './module-resolvers/module-resolvers-record-default.model';
import { UNIT_RESOLVER_DEFAULT_FN } from './module-resolvers/module-resolvers-unit-default.model';
import { VALUE_RESOLVER_DEFAULT_FN } from './module-resolvers/module-resolvers-value-default.model';
import { ModuleUnit } from './module-unit.model';
import { Module } from './module.model';

export class ModuleValueResolver {
  protected _moduleRef?: Module;
  private _units: Map<string, ModuleUnit> = new Map();
  private _recordResolver: RecordResolverFn = RECORD_RESOLVER_DEFAULT_FN.bind(this);
  private _valueResolver: ValueResolverFn = VALUE_RESOLVER_DEFAULT_FN.bind(this);
  private _unitResolver: UnitResolverFn = UNIT_RESOLVER_DEFAULT_FN.bind(this);

  get units(): ReadonlyMap<string, ModuleUnit> {
    return this._units;
  }

  constructor() {}

  withModule(module: Module) {
    this._moduleRef = module;
    return this;
  }

  withValueResolver(fn: ValueResolverFn) {
    this._valueResolver = fn.bind(this);
    return this;
  }

  withUnitResolver(fn: UnitResolverFn) {
    this._unitResolver = fn.bind(this);
    return this;
  }

  withModuleUnits(units?: Map<string, ModuleUnit>) {
    if (units) this._units = units;
    return this;
  }

  resolveRecord(context: ModuleValueContext, data: ModuleData) {
    return this._recordResolver(context, data);
  }

  resolveValue(context: ModuleValueContext, data: ModulePrimitive, unit?: ModuleUnit) {
    return this._valueResolver(context, data, unit);
  }

  resolveUnit(context: ModuleValueContext, preferredUnit?: string) {
    return this._unitResolver(context, preferredUnit);
  }
}
