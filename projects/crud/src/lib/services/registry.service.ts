import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { ViewConfig } from '../models/views';
import { Metadata } from '../models/metadata';
import { Field } from '../forms';


@Injectable({
  providedIn: 'root'
})
export class Registry {

  public forms: {[key: string]: FormGroup} = {};
  public screens: {[key: string]: ViewConfig} = {};
  public metadata: {[key: string]: Metadata} = {};
  private registry: any = {};
  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  registerMetadata(metadata: Metadata) {
    this.metadata[metadata.name] = metadata;
  }

  registerScreen(url: string, screen: ViewConfig) {
    this.screens[url] = screen;
  }

  registerForm(metadata: Metadata, formClass: any) {
    const ctrls = {};
    for (const ctrl of metadata.fields) {
      ctrls[ctrl.name] = new FormControl({}, ctrl.validators);
    }
    const f = new FormGroup(ctrls);
    this.forms[metadata.name] = f;
  }

  register(meta: {}) {
    this.registry = meta;
    this.isReady.next(true);
  }

  // getModules() {
  //   return this.registry;
  // }

  // getModel(moduleName: string, app: string, key: string): Model {
  //   return this.registry[moduleName].apps.filter((a: App) => a.key === app)[0]
  //     .models.filter(m => m.key === key)[0];
  // }

  // getApp(moduleName: string, app: string): App {
  //   return this.registry[moduleName].apps.filter(a => a.key === app)[0];
  // }

  // getAppModels(moduleName: string, app: string): {string: Model} {
  //   return this.registry[moduleName].apps.filter(a => a.key === app).models;
  // }

}
