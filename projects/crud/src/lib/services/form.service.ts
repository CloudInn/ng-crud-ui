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
          ctrls[innerC.name] = new FormControl(null, innerC.validators);
          innerC.defaultValue = null;
        });
        if (controlConfig.collapsibleFields) {
          controlConfig.collapsibleFields = controlConfig.collapsibleFields.filter(field => field.isHidden !== true);
          controlConfig.collapsibleFields.forEach(innerC => {
            ctrls[innerC.name] = new FormControl(null, innerC.validators);
            innerC.defaultValue = null;
          });
        }
        if (controlConfig.subFields) {
          ctrls[c.name] = new FormArray([]);
          controlConfig.subFields = controlConfig.subFields.filter(field => field.isHidden !== true);
          const group = this.create(controlConfig.subFields);
          ctrls[c.name].push(group);
          return;
        }
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
    return new FormGroup(ctrls);
  }

  update(config, data): FormGroup {
    const ctrls = {};
    config.forEach(c => {
      if (c.type === 'fieldset') {
        (c.control as FieldSetControlConfig).fields.forEach(innerC => {
          const emptyArrFieldSet = this.checkIfEmptyArray(data[innerC.name]);
          innerC.defaultValue = emptyArrFieldSet ? null : data[innerC.name];
          ctrls[innerC.name] = new FormControl(emptyArrFieldSet ? null : data[innerC.name], innerC.validators);
        });
        if (c.control.collapsibleFields) {
          (c.control as FieldSetControlConfig).collapsibleFields.forEach(innerC => {
            const emptyArrFieldSet = this.checkIfEmptyArray(data[innerC.name]);
            innerC.defaultValue = emptyArrFieldSet ? null : data[innerC.name];
            ctrls[innerC.name] = new FormControl(emptyArrFieldSet ? null : data[innerC.name], innerC.validators);
          });
        }
        if (c.control.subFields) {
          ctrls[c.name] = new FormArray([]);
          const controlConfig = c.control as FormSetControlConfig;
          if (data[c.name]?.length) {
            data[c.name].forEach(ctrl => {
              const group = this.update(controlConfig.subFields, ctrl);
              ctrls[c.name].push(group);
            });
          } else {
            controlConfig.subFields = controlConfig.subFields.filter(field => field.isHidden !== true);
            const group = this.create(controlConfig.subFields);
            ctrls[c.name].push(group);
          }
          return;
        }
        return;
      } else if (c.type === 'formset') {
        ctrls[c.name] = new FormArray([]);
        const controlConfig = c.control as FormSetControlConfig;
        if (data[c.name]?.length) {
          data[c.name].forEach(ctrl => {
            const group = this.update(controlConfig.fields, ctrl);
            ctrls[c.name].push(group);
          });
        } else {
          controlConfig.fields = controlConfig.fields.filter(field => field.isHidden !== true);
          const group = this.create(controlConfig.fields);
          ctrls[c.name].push(group);
        }
        return;
      }
      const emptyVar = this.checkIfEmptyArray(data[c.name]);
      ctrls[c.name] = new FormControl(emptyVar ? null : data[c.name], c.validators);
    });
    const fg = new FormGroup(ctrls);
    return fg;
  }
  checkIfEmptyArray(val) {
    let emptyVar = false;
    if (Array.isArray(val)) {
      if (val.length === 0) {
        emptyVar = true;
      }
    }
    return emptyVar;
  }
}