import { ModuleValueContext } from '../../enums/module-value-context.enum';
import { RecordResolverFn } from '../../interfaces/module-value-resolver.interface';

export const RECORD_RESOLVER_DEFAULT_FN: RecordResolverFn = function (context, data) {
  // do not resolve any data without having module provided
  if (!this._moduleRef) throw new Error('Module is required to identify the record value');

  // List and Card views should have "object" type of data with the keys that have ModuleId
  if (context === ModuleValueContext.Card || context === ModuleValueContext.List) {
    if (Array.isArray(data)) throw new Error('Can not process context record');
    return data[this._moduleRef.moduleId];
  }

  // by default will expect array only and will return first item from the list
  if (!Array.isArray(data)) throw new Error('Can not identify record for the context');
  return data.at(-1);
};
