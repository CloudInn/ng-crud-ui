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
  FormSet,
  File,
}

export class Field implements BaseField {
  key: string;
  label: string;
  type: FieldType;
  is_editable: boolean = true;
  is_searchable: boolean = false;
  foreign_model: string = null;

  constructor(
    label: string,
    key: string,
    type: FieldType,
    is_editable?: boolean,
    is_searchable?: boolean,
    foreign_model?: any,
    colors?: any
  ) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.is_editable = is_editable;
    this.is_searchable = is_searchable;
    this.foreign_model = foreign_model;
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