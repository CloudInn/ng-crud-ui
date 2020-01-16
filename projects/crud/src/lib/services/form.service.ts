import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FieldConfig, FormSetControlConfig, FieldSetControlConfig } from '../models/metadata';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  create(config: FieldConfig[]): FormGroup {
    const ctrls = {};
    config.forEach(c => {
      if (c.type === 'fieldset') {
        (c.control as FieldSetControlConfig).fields.forEach(innerC => {
          ctrls[innerC.name] = new FormControl(null, c.validators);
        });
        return;
      } else if (c.type === 'formset') {
        const controlConfig = c.control as FormSetControlConfig;
        const group = this.create(controlConfig.fields);
        ctrls[c.name] = new FormArray([group]);
        return;
      }

      ctrls[c.name] = new FormControl(null, c.validators);
      if (!c.isEditable) {
        ctrls[c.name].disable();
      }
    });
    const fg = new FormGroup(ctrls);
    return fg;
  }

}
