import { InjectionToken } from '@angular/core';
import { ModuleData } from '../interfaces/module-data.inteface';
import { ModuleResolver } from '../interfaces/module-resolver.interface';
import { Module } from './module.model';

export const MODULE = new InjectionToken<Module>('MODULE');
export const MODULE_DATA = new InjectionToken<ModuleData>('MODULE_DATA');
export const MODULE_RESOLVER = new InjectionToken<ModuleResolver[]>('MODULE_RESOLVER');
