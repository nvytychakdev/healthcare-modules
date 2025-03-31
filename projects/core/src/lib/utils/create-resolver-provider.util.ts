import { makeEnvironmentProviders, Type } from '@angular/core';
import { MODULE_RESOLVER } from '../models/module-inject.model';

export const createResolverProvider = (provider: Type<unknown>) => {
  return makeEnvironmentProviders([
    {
      provide: MODULE_RESOLVER,
      useClass: provider,
      multi: true,
    },
  ]);
};
