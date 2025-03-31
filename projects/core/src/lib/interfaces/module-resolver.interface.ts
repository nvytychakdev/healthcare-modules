import { Module } from '../models/module.model';
import { ModuleConfig } from './module-config.interface';

export interface ModuleResolver {
  canResolve(moduleConfig: ModuleConfig): boolean;
  resolve(moduleConfig: ModuleConfig): Module;
}
