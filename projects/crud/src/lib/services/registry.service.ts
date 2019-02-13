import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ViewConfig } from '../models/views';
import { Metadata } from '../models/metadata';


@Injectable({
  providedIn: 'root'
})
export class Registry {

  public forms: {[key: string]: FormGroup} = {};
  public screens: {[key: string]: ViewConfig} = {};
  public metadata: {[key: string]: Metadata} = {};
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
    this.isReady.next(true);
  }

}
