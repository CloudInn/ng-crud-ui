import { FormControl } from '@angular/forms';

export interface BaseField {
  label: string;
}

export enum FieldType {
  Text,
  Number,
  Date,
  DateTime,
  Time,
  Boolean,
  ForeignKey,
  ManyToMany,
  // FormSet,
  File,
}

export class Field implements BaseField {
  key: string;
  label: string;
  value_type: string;
  control_type: string;
  is_editable: boolean = true;
  is_searchable: boolean = true;
  is_hidden: boolean = false;
  // foreign key information
  // foreign_model?: any = null; // evaluated in run time
  foreign_model_path?: string;
  // choices?: any[];
  fields: Field[];
  choices: any;
  colspan = 1;
  rowspan = 1;

  _value: any;

  constructor(
    label: string,
    key: string,
    type: string,
    is_editable?: boolean,
    is_searchable?: boolean,
    foreign_model?: any,
    colors?: any
  ) {
    this.key = key;
    this.label = label;
    this.value_type = type;
    this.is_editable = is_editable;
    this.is_searchable = is_searchable;
    // this.foreign_model = foreign_model;
  }

}

export class Fieldset implements BaseField {
  label: string;
  is_fieldset = true;
  fields: Field[];
}

export class Formset implements BaseField {
  label: string;
  model: any;
}

export class AutoCompleteField<T> extends FormControl {
  value: T;
  label: string = 'some label';
}

// export class BaseModel {
//   api: string
//   fields: BaseField[]
//   displayField: string
//   valueField: string

//   getNgModel(): any {
//     const obj = {};
//     for (let f of this.fields) {
//       obj[f['key']] = null;
//     }
//     return obj;
//   }
// }