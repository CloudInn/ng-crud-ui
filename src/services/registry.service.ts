import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Field } from '../forms';

export class Module {
  label: string;
  apps: App[] = [];
}

export class App {
  key: string;
  label: string;
  icon: string;
  models: Model[] = [];
}

export class Model {
  key: string;
  api: string;
  verbose_name: string;
  fields: Field[] = [];
  formsets: Field[] = [];
  external_value_field: string;
  external_name_field: string;
  listing_fields: string[];
  actions: string[] = [];
  bulk_actions: string[] = [];
  list_actions: string[] = [];
}

@Injectable()
export class Registry {

  private registry: any = {};
  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  register(meta: {}) {
    this.registry = meta;
    console.log('registry is ready');
    this.isReady.next(true);
  }

  getModules(): any {
    return this.registry;
  }

  getModel(moduleName: string, app: string, key: string): Model {
    return this.registry[moduleName].apps.filter((a: App) => a.key === app)[0]
      .models.filter(m => m.key === key)[0];
  }

  getApp(moduleName: string, app: string): App {
    return this.registry[moduleName].apps.filter(a => a.key === app)[0];
  }

  getAppModels(moduleName: string, app: string): {string: Model} {
    return this.registry[moduleName].apps.filter(a => a.key === app).models;
  }

}
