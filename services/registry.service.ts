import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Registry {

  models = [];
  apps = [];
  modules = [];
  // apps = new EventEmitter<any[]>();
  // modules = new EventEmitter<any[]>();

  constructor() {
  }

  registerModule(name, key) {
    this.modules.push({name, key, children: []});
    // this.modules.next(this._modules);
  }

  registerApp(module, name, key, icon) {
    this.apps.push({name, key, module, icon});
    // this.apps.next(this._apps);
  }

  registerModel(app: string, name: string, model: any) {
    const item = {app, name, model};
    this.models.push(item);
  }

  getModel(app: string, key: string) {
    return this.models.filter(model => model.app === app && model.name === key)[0];
  }

  getApp(key) {
    return this.apps.filter(app => app.key === key)[0];
  }

  getAppModels(key) {
    return this.models.filter(model => model.app === key);
  }

}
