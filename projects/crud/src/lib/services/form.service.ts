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
        const controlConfig = c.control as FieldSetControlConfig;
        controlConfig.fields = controlConfig.fields.filter(field => !field.isHidden);
        controlConfig.fields.forEach(innerC => {
          ctrls[innerC.name] = new FormControl(null, c.validators);
          innerC.defaultValue = null;
        });
        return;
      } else if (c.type === 'formset') {
        const controlConfig = c.control as FormSetControlConfig;
        controlConfig.fields = controlConfig.fields.filter(field => !field.isHidden);
        const group = this.create(controlConfig.fields);
        ctrls[c.name] = new FormArray([group]);
        return;
      }

      ctrls[c.name] = new FormControl(null, c.validators);
    });
    const fg = new FormGroup(ctrls);
    return fg;
  }

  update(config, data): FormGroup {
    const ctrls = {};
    config.forEach(c => {
      if (c.type === 'fieldset') {
        (c.control as FieldSetControlConfig).fields.forEach(innerC => {
          innerC.defaultValue = data[innerC.name];
          ctrls[innerC.name] = new FormControl(data[innerC.name]);
        });
        return;
      } else if (c.type === 'formset') {
        const controlConfig = c.control as FormSetControlConfig;
        data[c.name].forEach(ctrl => {
          const group = this.update(controlConfig.fields, ctrl);
          ctrls[c.name] = new FormArray([group]);
        });
        return;
      }
      ctrls[c.name] = new FormControl(data[c.name], c.validators);
    });
    const fg = new FormGroup(ctrls);
    return fg;
  }
}
