import { ModuleValueContext } from '../enums/module-value-context.enum';
import { ModuleData } from '../interfaces/module-data.inteface';
import { ModulePrimitive } from '../interfaces/module-primitive.interface';
import {
  PreferredUnitResolverFn,
  RecordResolverFn,
  UnitResolverFn,
  ValueResolverFn,
} from '../interfaces/module-value-resolver.interface';
import { RECORD_RESOLVER_DEFAULT_FN } from './module-resolvers/module-resolvers-record-default.model';
import {
  PREFERRED_UNIT_RESOLVER_DEFAULT_FN,
  UNIT_RESOLVER_DEFAULT_FN,
} from './module-resolvers/module-resolvers-unit-default.model';
import { VALUE_RESOLVER_DEFAULT_FN } from './module-resolvers/module-resolvers-value-default.model';
import { ModuleUnit } from './module-unit.model';
import { Module } from './module.model';

export class ModuleValueResolver {
  protected _moduleRef?: Module;
  private _units: Map<string, ModuleUnit> = new Map();
  private _recordResolver: RecordResolverFn;
  private _valueResolver: ValueResolverFn;
  private _unitResolver: UnitResolverFn;
  private _preferredUnitResolver: PreferredUnitResolverFn;

  get units(): ReadonlyMap<string, ModuleUnit> {
    return this._units;
  }

  constructor() {
    this._recordResolver = RECORD_RESOLVER_DEFAULT_FN.bind(this);
    this._valueResolver = VALUE_RESOLVER_DEFAULT_FN.bind(this);
    this._unitResolver = UNIT_RESOLVER_DEFAULT_FN.bind(this);
    this._preferredUnitResolver = PREFERRED_UNIT_RESOLVER_DEFAULT_FN.bind(this);
  }

  withModule(module: Module) {
    this._moduleRef = module;
    return this;
  }

  withRecordResolver(fn: RecordResolverFn) {
    this._recordResolver = fn.bind(this);
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

  withPreferredUnitResolver(fn: PreferredUnitResolverFn) {
    this._preferredUnitResolver = fn.bind(this);
    return this;
  }

  withModuleUnits(units?: Map<string, ModuleUnit>) {
    if (units) this._units = units;
    return this;
  }

  resolveRecord(context: ModuleValueContext, data: ModuleData): ModulePrimitive | undefined {
    return this._recordResolver(context, data);
  }

  resolveValue(
    context: ModuleValueContext,
    data: ModulePrimitive,
    unit?: ModuleUnit,
  ): string | undefined {
    return this._valueResolver(context, data, unit);
  }

  resolveUnit(context: ModuleValueContext, preferredUnit?: string): ModuleUnit | undefined {
    return this._unitResolver(context, preferredUnit);
  }

  resolvePreferredUnit(context: ModuleValueContext, preferredUnits: ReadonlyMap<string, string>) {
    return this._preferredUnitResolver(context, preferredUnits);
  }
}
