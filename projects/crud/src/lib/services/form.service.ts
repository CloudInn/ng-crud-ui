import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FieldConfig, FormSetControlConfig, FieldSetControlConfig } from '../models/metadata';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  create(config: FieldConfig[], mode?: string): FormGroup {
    const ctrls = {};
    config.forEach(c => {
      if (c.type === 'fieldset') {
        const controlConfig = c.control as FieldSetControlConfig;
        controlConfig.fields = controlConfig.fields.filter(field => field.isHidden !== true);
        controlConfig.fields.forEach(innerC => {
          ctrls[innerC.name] = new FormControl(null, c.validators);
          innerC.defaultValue = null;
        });
        return;
      } else if (c.type === 'formset') {
        ctrls[c.name] = new FormArray([]);
        const controlConfig = c.control as FormSetControlConfig;
        controlConfig.fields = controlConfig.fields.filter(field => field.isHidden !== true);
        const group = this.create(controlConfig.fields);
        ctrls[c.name].push(group);
        return;
      }
      if (mode && mode === 'search' && c.keyOnSearch) {
        ctrls[c.keyOnSearch] = new FormControl((c.defaultValue && c.defaultValue !== null) ? c.defaultValue : null, c.validators);
      } else {
        ctrls[c.name] = new FormControl((c.defaultValue && c.defaultValue !== null) ? c.defaultValue : null, c.validators);
      }
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
        ctrls[c.name] = new FormArray([]);
        const controlConfig = c.control as FormSetControlConfig;
        data[c.name].forEach(ctrl => {
          const group = this.update(controlConfig.fields, ctrl);
          ctrls[c.name].push(group);
        });
        return;
      }
      ctrls[c.name] = new FormControl(data[c.name], c.validators);
    });
    const fg = new FormGroup(ctrls);
    return fg;
  }
}
