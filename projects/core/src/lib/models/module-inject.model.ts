import { InjectionToken } from '@angular/core';
import { Patient } from '../../../../../src/app/models/patient.model';
import { ModuleResolver } from '../interfaces/module-resolver.interface';
import { Module } from './module.model';

export const MODULE = new InjectionToken<Module>('MODULE');
export const MODULE_DATA = new InjectionToken<Patient['data']>('MODULE_DATA');
export const MODULE_RESOLVER = new InjectionToken<ModuleResolver[]>('MODULE_RESOLVER');
