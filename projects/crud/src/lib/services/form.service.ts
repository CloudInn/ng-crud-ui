import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable ,  Subject } from 'rxjs';
import { Field  } from '../forms';
import { FieldConfig, Fieldset, FormsetConfig } from '../models/metadata';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {}

  toFormGroup(fields: Field[]): FormGroup {
    const controls = {};
    for (const field of fields) {
      if (field.control_type === 'formset') {
        controls[field.key] = this.toFormArray(field.fields, field._value);
      } else {
        controls[field.key] = new FormControl(field._value);
      }
    }
    return new FormGroup(controls);
  }

  toFormArray(fields: Field[], values: any[]) {
    if (!values) {
      values = [];
    }
    const groups: FormGroup[] = [];
    values.forEach(v => {
      // assign value to fields
      fields.map(f => {
        f._value = v[f.key];
      });
      const group = this.toFormGroup(fields);
      groups.push(g);
    });
    // always add an empty row
    const g = this.toFormGroup(fields);
    const emptyValues = {};
    for (const f of fields) {
      emptyValues[f.key] = null;
    }
    g.setValue(emptyValues);
    groups.push(g);
    return new FormArray(groups);
  }

  create(config: FieldConfig[]): FormGroup {
    const ctrls = {};
    config.forEach(c => {
      if (c.control && c.control.type === 'fieldset') {
        (c as Fieldset).fields.forEach(innerC => {
          ctrls[innerC.name] = new FormControl(null, c.validators);
        });
        return;
      } else if (c.control && c.control.type === 'formset') {
        const group = this.create(c.control.fields);
        ctrls[c.name] = new FormArray([group]);
        return;
      }
      ctrls[c.name] = new FormControl(null, c.validators);
    });
    const fg = new FormGroup(ctrls);
    return fg;
  }

  createFormArray(config: FormsetConfig) {
    const form = this.create(config.fields);
    return new FormArray([form]);
  }

}
