import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Field } from '../forms';

@Injectable()
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
      const g = this.toFormGroup(fields);
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

}
