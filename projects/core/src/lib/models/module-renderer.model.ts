import {
  Directive,
  effect,
  inject,
  Injector,
  input,
  Provider,
  StaticProvider,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Module } from './module.model';

/**
 *
 */
@Directive()
export abstract class ModuleRenderer {
  private readonly injector = inject(Injector);
  private readonly container = viewChild('container', { read: ViewContainerRef });

  readonly module = input.required<Module>();

  constructor() {
    effect(() => {
      const module = this.module();
      const injector = this.createInjector(module);
      const component = this.getRenderComponent();
      this.container()?.createComponent(component, { injector });
    });
  }

  private createInjector(module: Module) {
    const staticProviders = [{ provide: Module, useValue: module }];
    const customProviders = this.createProviders();

    return Injector.create({
      providers: [...staticProviders, ...customProviders],
      parent: this.injector,
    });
  }

  createProviders(): Array<Provider | StaticProvider> {
    return [];
  }

  abstract getRenderComponent(): Type<unknown>;

  ngOnDestroy() {
    this.container()?.clear();
  }
}
